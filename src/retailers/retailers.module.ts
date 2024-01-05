import { Module } from "@nestjs/common";
import { RetailersService } from "./retailers.service";
import { RetailersController } from "./retailers.controller";
import { UsersService } from "../users/users.service";
import { ImagesService } from "../images/images.service";
import { EwalletsService } from "../ewallets/ewallets.service";

@Module({
  controllers: [RetailersController],
  providers: [RetailersService, UsersService, ImagesService, EwalletsService],
})
export class RetailersModule {}
