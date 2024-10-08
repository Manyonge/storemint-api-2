import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { CreateAuthEmailDto } from "./dto/create-auth-email.dto";
import { LoginDto } from "./dto/login.dto";
import { CreateAuthEmailFilesDto } from "./dto/create-auth-email-files.dto";
import { AuthGuard } from "./auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup/email")
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: "businessLogo",
        maxCount: 1,
      },
    ]),
  )
  signUpWithEmail(
    @Body() createAuthEmailDto: CreateAuthEmailDto,
    @UploadedFiles()
    files: CreateAuthEmailFilesDto,
  ) {
    return this.authService.signUpWithEmail(createAuthEmailDto, files);
  }

  @Post("login")
  login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(loginDto, res);
  }

  @UseGuards(AuthGuard)
  @Get("refresh-token")
  refreshToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.refreshToken(req, res);
  }

  @Get("validate-access-token")
  validateAccessToken(@Req() req: Request) {
    return this.authService.validateAccessToken(req);
  }
}
