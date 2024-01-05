import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UsersService } from "../users/users.service";
import { RetailersService } from "../retailers/retailers.service";
import { EwalletsService } from "../ewallets/ewallets.service";
import { ImagesService } from "../images/images.service";
import * as dotenv from "dotenv";

dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [
    AuthService,
    UsersService,
    RetailersService,
    EwalletsService,
    ImagesService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
