import { Body, Controller, Get, Post, Req, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateWithPasswordDto } from "../users/dtos/create-with-password.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { Request, Response } from "express";
import { CreateGoogleSigninDto } from "./dto/create-google-signin.dto";
import { LoginDto } from "./dto/login.dto";

@Controller("api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post("signup-with-email")
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: "businessLogo",
        maxCount: 1,
      },
      {
        name: "passportPhoto",
        maxCount: 1,
      },
    ]),
  )
  signUpWithEmail(
    @Body() createAuthEmailDto: CreateWithPasswordDto,
    @Res({ passthrough: true }) res: Response,
    @UploadedFiles()
      files: {
      businessLogo?: Express.Multer.File[];
      passportPhoto?: Express.Multer.File[];
    },
  ) {
    return this.authService.signUpWithEmail(createAuthEmailDto, files, res);
  }

  @Post("signin-with-google")
  signinWithGoogle(
    @Body() createGoogleSigninDto: CreateGoogleSigninDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signinWithGoogle(createGoogleSigninDto, res);
  }

  @Post("login")
  login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.loginWithEmail(loginDto, res);
  }

  @Get("refresh-token")
  refreshToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.refreshToken(req, res);
  }

  @Get("validate-access-token")
  validateAccessToken(@Req() req: Request) {
    return this.authService.validateAccessToken(req);
  }
}
