import { Module } from "@nestjs/common";
import { ConditionsService } from "./conditions.service";
import { ConditionsController } from "./conditions.controller";
import { RetailersService } from "../retailers/retailers.service";
import { UsersService } from "../users/users.service";
import { ImagesService } from "../images/images.service";
import { EwalletsService } from "../ewallets/ewallets.service";

@Module({
  controllers: [ConditionsController],
  providers: [
    ConditionsService,
    RetailersService,
    UsersService,
    ImagesService,
    EwalletsService,
  ],
})
export class ConditionsModule {}
