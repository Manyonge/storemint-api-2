import { Module } from "@nestjs/common";
import { StaffService } from "./staff.service";
import { StaffController } from "./staff.controller";
import { UsersService } from "../users/users.service";
import { RetailersService } from "../retailers/retailers.service";
import { ImagesService } from "../images/images.service";
import { EwalletsService } from "../ewallets/ewallets.service";

@Module({
  controllers: [StaffController],
  providers: [
    StaffService,
    UsersService,
    RetailersService,
    ImagesService,
    EwalletsService,
  ],
})
export class StaffModule {}
