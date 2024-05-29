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
import { UsersService } from "../users/users.service";
import { LoginDto } from "./dto/login.dto";
import { TokenEntity } from "./entities/token.entity";
import { CreateAuthEmailDto } from "./dto/create-auth-email.dto";
import { ProviderEnum, RoleEnum } from "../users/enums";
import { ImagesService } from "../images/images.service";
import { RetailersService } from "../retailers/retailers.service";

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
    const user = await this.prisma.user.findFirst({
      where: {
        email: loginDto.email,
      },
    });

    if (!user) throw new BadRequestException("email not found");

    const isPassCorrect = await this.usersService.comparePasswords(
      loginDto.password,
      user.hash,
    );
    if (!isPassCorrect) {
      throw new BadRequestException("email or password is incorrect");
    }
    try {
      let retailerId = 0;
      let retailer = await this.prisma.retailer.findUnique({
        where: {
          uid: user.uid,
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
          },
        });
        retailerId = staff.retailerId;
      }

      if (!retailer.isActivated) {
        throw new BadRequestException("account not yet activated");
      }

      const accessToken = await this.generateAccessToken(user.uid);

      return {
        accessToken,
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
      console.log(e);
      if (e instanceof BadRequestException) {
        throw e;
      }
      throw new InternalServerErrorException("internal server error");
    }
  }

  async signUpWithEmail(
    createAuthEmailDto: CreateAuthEmailDto,
    files: {
      businessLogo?: Express.Multer.File[];
    },
  ) {
    //is email and business name new
    const email = await this.prisma.user.findFirst({
      where: {
        email: createAuthEmailDto.businessEmail,
      },
    });

    if (email) {
      throw new BadRequestException("email is already in use");
    }

    const retailer = await this.prisma.retailer.findFirst({
      where: {
        businessName: createAuthEmailDto.businessName,
      },
    });
    if (retailer) {
      throw new BadRequestException("business name is already in use");
    }

    if (createAuthEmailDto.password !== createAuthEmailDto.confirmPassword) {
      throw new BadRequestException("passwords do not match");
    }

    try {
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
        },
      });

      await this.ewalletService.create(retailer.id);

      const accessToken = await this.generateAccessToken(user.uid);

      return { accessToken, retailer };
    } catch (e: any) {
      console.log(e);
      throw new InternalServerErrorException("internal server error");
    }
  }

  async generateAccessToken(uid: number) {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const iat = Math.floor(timestamp / 1000);
    const date = new Date(timestamp);
    date.setDate(date.getDate() + 7);
    const newTimestamp = date.getTime();
    const exp = Math.floor(newTimestamp / 1000);
    const payload: TokenEntity = { sub: uid, iat, exp, expiresIn: "7d" };
    return await this.jwtService.signAsync(payload);
  }

  async generateRefreshToken(uid: number) {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const iat = Math.floor(timestamp / 1000);
    const date = new Date(timestamp);
    date.setDate(date.getDate() + 7);
    const newTimestamp = date.getTime();
    const exp = Math.floor(newTimestamp / 1000);
    const payload: TokenEntity = { sub: uid, iat, exp, expiresIn: "180d" };
    const token = await this.jwtService.signAsync(payload);
    //record in database
    await this.prisma.refreshToken.create({ data: { token } });
    return token;
  }

  async findRefreshToken(token: string) {
    return await this.prisma.refreshToken.findFirst({ where: { token } });
  }

  async deleteRefreshToken(oldToken: string) {
    const token = await this.findRefreshToken(oldToken);
    if (token) {
      return await this.prisma.refreshToken.delete({ where: { id: token.id } });
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
    const receivedRefreshToken = req.cookies["refreshToken"];
    if (receivedRefreshToken) {
      try {
        const payload = await this.jwtService.verifyAsync(receivedRefreshToken);
        const record = await this.findRefreshToken(receivedRefreshToken);
        if (record && payload) {
          const newRefreshToken = await this.generateRefreshToken(payload.sub);
          const newAccessToken = await this.generateAccessToken(payload.sub);
          await this.deleteRefreshToken(record.token);
          res.cookie("refreshToken", newRefreshToken, {
            maxAge: 6 * 30 * 24 * 60 * 60 * 1000,
          });
          res.send({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          });
        }
      } catch (e) {
        throw new UnauthorizedException();
      }
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
