import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { PrismaService } from "nestjs-prisma";
import * as process from "process";
import { EwalletsService } from "../ewallets/ewallets.service";
import { RetailersService } from "../retailers/retailers.service";
import { CreateWithPasswordDto } from "../users/dtos/create-with-password.dto";
import { CreateWithoutPasswordDto } from "../users/dtos/create-without-password.dto";
import { UsersService } from "../users/users.service";
import { CreateGoogleSigninDto } from "./dto/create-google-signin.dto";
import { LoginDto } from "./dto/login.dto";
import { TokenEntity } from "./entities/token.entity";

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly retailersService: RetailersService,
    private readonly ewalletService: EwalletsService,
    private readonly jwtService: JwtService,
  ) {}

  async loginWithEmail(loginDto: LoginDto, res: Response) {
    //find user with this email
    const user = await this.usersService.findByEmailProvider(loginDto.email);
    //throw errors if email doesn't exist
    if (!user) throw new BadRequestException("Email not found");
    //compare
    const isPassCorrect = await this.usersService.comparePasswords(
      loginDto.password,
      user.hash,
    );
    if (!isPassCorrect) {
      throw new BadRequestException("Email or Password is incorrect");
    }
    const retailer = await this.retailersService.findByUid(user.uid);
    const accessToken = await this.generateAccessToken(user.uid);
    const refreshToken = await this.generateRefreshToken(user.uid);
    res.cookie("refreshToken", refreshToken, {
      maxAge: 6 * 30 * 24 * 60 * 60 * 1000,
    });
    res.send({ accessToken, retailerId: retailer.id, refreshToken });
  }

  async signUpWithEmail(
    createAuthEmailDto: CreateWithPasswordDto,
    files: {
      businessLogo?: Express.Multer.File[];
      passportPhoto?: Express.Multer.File[];
    },
    res: Response,
  ) {
    //is email and business name new
    const isEmailExistent = await this.usersService.isEmailExistent(
      createAuthEmailDto.businessEmail,
    );
    if (isEmailExistent) {
      throw new HttpException("Email already used", HttpStatus.BAD_REQUEST);
    }
    const isBusinessNameExistent =
      await this.retailersService.isBusinessNameExistent(
        createAuthEmailDto.businessName,
      );
    if (isBusinessNameExistent) {
      throw new HttpException(
        "Business name already used",
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      //create user and return uid
      const uid =
        await this.usersService.createWithPassword(createAuthEmailDto);
      //create retailer and return retailerId
      const retailerId = await this.retailersService.createThruEmail(
        createAuthEmailDto,
        uid,
        files,
      );
      //create ewallet with 0 balance
      await this.ewalletService.create(retailerId);
      //create access token and refresh token
      const accessToken = await this.generateAccessToken(uid);
      const refreshToken = await this.generateRefreshToken(uid);
      //return response with access token in body and refresh token in cookie
      res.cookie("refreshToken", refreshToken, {
        maxAge: 6 * 30 * 24 * 60 * 60 * 1000,
      });
      res.send({ accessToken, retailerId, refreshToken });
    } catch (e: any) {
      console.log(e);
      throw new HttpException(
        "Internal server error",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
    return this.prisma.refreshToken.findFirst({ where: { token } });
  }

  async deleteRefreshToken(oldToken: string) {
    const token = await this.findRefreshToken(oldToken);
    if (token) {
      return this.prisma.refreshToken.delete({ where: { id: token.id } });
    }
    return null;
  }

  async signinWithGoogle(
    createGoogleSigninDto: CreateGoogleSigninDto,
    res: Response,
  ) {
    //verify token
    const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);
    try {
      const ticket = await client.verifyIdToken({
        idToken: createGoogleSigninDto.credential,
        audience: process.env.OAUTH_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      //confirm if user exists
      const user = await this.usersService.findByGoogleProvider(payload.email);
      let uid;
      let retailerId;
      if (!user) {
        const userDto: CreateWithoutPasswordDto = {
          ownerName: `${payload.given_name} ${payload.family_name}`,
          email: payload.email,
        };
        uid = await this.usersService.createWithoutPassword(userDto);
        //create retailer
        retailerId = await this.retailersService.createThroughGoogle({
          uid,
          businessEmail: payload.email,
        });
        //create ewallet
        await this.ewalletService.create(retailerId);
      } else {
        uid = user.uid;
        const retailer = await this.retailersService.findByUid(uid);
        if (retailer) retailerId = retailer.id;
      }
      //create access token and refresh token
      const accessToken = await this.generateAccessToken(uid);
      const refreshToken = await this.generateRefreshToken(uid);
      //return response with access token in body and refresh token in cookie
      res.cookie("refreshToken", refreshToken, {
        maxAge: 6 * 30 * 24 * 60 * 60 * 1000,
      });
      res.send({ accessToken, retailerId, refreshToken });
    } catch (e) {
      console.log(e);
      throw new HttpException(
        "There was an error with signing in with google",
        HttpStatus.BAD_REQUEST,
      );
    }
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
