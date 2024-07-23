import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { PrismaService } from "nestjs-prisma";
import { EwalletsService } from "../ewallets/ewallets.service";
import { ImagesService } from "../images/images.service";
import { RetailersService } from "../retailers/retailers.service";
import { ProviderEnum, RoleEnum } from "../users/enums";
import { UsersService } from "../users/users.service";
import { CreateAuthEmailDto } from "./dto/create-auth-email.dto";
import { LoginDto } from "./dto/login.dto";
import { TokenEntity } from "./entities/token.entity";
import { handleError } from "../helpers";
import { CreateAuthEmailFilesDto } from "./dto/create-auth-email-files.dto";

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,

    private readonly imagesService: ImagesService,
    private readonly retailersService: RetailersService,

    private readonly usersService: UsersService,
    private readonly ewalletService: EwalletsService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      //confirm such an email exists
      const email = await this.prisma.user.findFirst({
        where: {
          email: loginDto.email,
          deletedAt: null,
        },
      });

      if (!email) throw new BadRequestException("email not found");

      //find an account where user is activated
      const user = await this.prisma.user.findFirst({
        where: {
          email: loginDto.email,
          isActivated: true,
          deletedAt: null,
        },
      });
      let activeRetailer = null;
      if (user) {
        activeRetailer = await this.prisma.retailer.findFirst({
          where: {
            deletedAt: null,
            isActivated: true,
            uid: user.uid,
          },
        });
      }
      if (!user || !activeRetailer)
        throw new BadRequestException("user not yet activated");

      const isPassCorrect = await this.usersService.comparePasswords(
        loginDto.password,
        user.hash,
      );
      if (!isPassCorrect) {
        throw new BadRequestException("email or password is incorrect");
      }

      let retailerId = 0;
      let retailer = await this.prisma.retailer.findUnique({
        where: {
          uid: user.uid,
          deletedAt: null,
          isActivated: true,
        },
      });
      const staff = await this.prisma.staff.findFirst({
        where: {
          uid: user.uid,
        },
      });
      if (!!retailer) {
        retailerId = retailer.id;
      }
      if (!!staff) {
        retailer = await this.prisma.retailer.findUnique({
          where: {
            id: staff.retailerId,
            deletedAt: null,
            isActivated: true,
          },
        });
        retailerId = staff.retailerId;
      }

      const accessToken = await this.generateAccessToken(user.uid);

      return {
        accessToken: accessToken.token,
        expiresAt: accessToken.expiresAt,
        retailerId,
        user: {
          name: user.name,
          uid: user.uid,
          phoneNumber: user.phoneNumber,
          email: user.email,
          role: user.role,
        },
      };
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw e;
      }
      console.log(e);
      if (e instanceof BadRequestException) {
        throw e;
      }
      throw new InternalServerErrorException("internal server error");
    }
  }

  async signUpWithEmail(
    createAuthEmailDto: CreateAuthEmailDto,
    files: CreateAuthEmailFilesDto,
  ) {
    try {
      //enforce business logo
      if (!files || !files?.businessLogo) {
        throw new BadRequestException("business logo is required");
      }

      if (createAuthEmailDto.password !== createAuthEmailDto.confirmPassword) {
        throw new BadRequestException("passwords do not match");
      }

      const hashedPassword = await this.usersService.hashPassword(
        createAuthEmailDto.password,
      );
      const user = await this.prisma.user.create({
        data: {
          email: createAuthEmailDto.businessEmail,
          phoneNumber: createAuthEmailDto.businessPhone,
          name: createAuthEmailDto.ownerName,
          hash: hashedPassword,
          role: RoleEnum.STORE_ADMIN,
          provider: ProviderEnum.EMAIL,
        },
      });

      const { publicUrl: logoPublic } = await this.imagesService.uploadImage(
        "business logos",
        files.businessLogo[0],
      );

      const retailer = await this.prisma.retailer.create({
        data: {
          uid: user.uid,
          isActivated: false,
          businessName: createAuthEmailDto.businessName,
          businessEmail: createAuthEmailDto.businessEmail,
          businessLogo: logoPublic,
          businessInstagram: createAuthEmailDto.businessInstagram,
          businessPhone: createAuthEmailDto.businessPhone,
        },
      });

      const accessToken = await this.generateAccessToken(user.uid);

      return {
        accessToken: accessToken.token,
        expiresAt: accessToken.expiresAt,
        retailer: retailer,
      };
    } catch (e: any) {
      handleError(e);
    }
  }

  async generateAccessToken(uid: number) {
    try {
      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      const iat = timestamp;
      const exp = timestamp + 1000 * 3600; // 1 hour
      const payload: TokenEntity = { sub: uid, iat, exp, expiresIn: "1H" };
      const token = await this.jwtService.signAsync(payload);
      return { token, expiresAt: exp };
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw e;
      }
      throw new InternalServerErrorException("internal server error");
    }
  }

  async generateRefreshToken(uid: number) {
    try {
      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      const iat = timestamp;
      const exp = timestamp + 1000 * 3600 * 24 * 30; // 1 month
      const payload: TokenEntity = { sub: uid, iat, exp, expiresIn: "30d" };
      const token = await this.jwtService.signAsync(payload);
      //record in database
      //hashToken
      const hashedToken = await this.usersService.hashPassword(token);
      await this.prisma.refreshToken.create({ data: { token: hashedToken } });
      return token;
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw e;
      }
      throw new InternalServerErrorException("internal server error");
    }
  }
  async findRefreshToken(token: string) {
    try {
      const hashedToken = await this.usersService.hashPassword(token);
      return await this.prisma.refreshToken.findFirst({
        where: { token: hashedToken },
      });
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw e;
      }
      throw new InternalServerErrorException("internal server error");
    }
  }

  async deleteRefreshToken(oldToken: string) {
    const token = await this.findRefreshToken(oldToken);
    if (token) {
      return this.prisma.refreshToken.delete({ where: { id: token.id } });
    }
    return null;
  }

  extractTokenFromHeader(request: Request): string | undefined {
    const authHeaders = request.headers["authorization"];
    if (authHeaders && authHeaders.startsWith("Bearer ")) {
      return authHeaders.slice("Bearer ".length);
    }
    return undefined;
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const receivedRefreshToken = req.cookies["refreshToken"];
      if (receivedRefreshToken) {
        try {
          const payload =
            await this.jwtService.verifyAsync(receivedRefreshToken);
          const record = await this.findRefreshToken(receivedRefreshToken);

          //check if token's expired
          const createAt = new Date(record.createdAt);
          const now = new Date();
          if (now.getTime() - createAt.getTime() >= 1000 * 3600 * 24 * 30) {
            throw new UnauthorizedException();
          }

          if (record && payload) {
            const newRefreshToken = await this.generateRefreshToken(
              payload.sub,
            );
            const newAccessToken = await this.generateAccessToken(payload.sub);
            await this.deleteRefreshToken(record.token);
            res.cookie("refreshToken", newRefreshToken, {
              maxAge: 1000 * 3600 * 24 * 30,
            });
            res.send({
              accessToken: newAccessToken.token,
              expiresAt: newAccessToken.expiresAt,
              refreshToken: newRefreshToken,
            });
          }
        } catch (e) {
          throw new UnauthorizedException();
        }
      }
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async validateAccessToken(req: Request) {
    const accessToken = this.extractTokenFromHeader(req);
    try {
      await this.jwtService.verifyAsync(accessToken);
      return { isValid: true };
    } catch (e) {
      return { isValid: false };
    }
  }
}
