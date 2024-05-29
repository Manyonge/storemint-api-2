import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { Request, Response } from "express";
import { CreateAuthEmailDto } from "./dto/create-auth-email.dto";

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
    files: {
      businessLogo?: Express.Multer.File[];
    },
  ) {
    return this.authService.signUpWithEmail(createAuthEmailDto, files);
  }

  @Post("login")
  login(@Body() loginDto: any, @Res({ passthrough: true }) res: Response) {
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
