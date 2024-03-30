import { Module } from "@nestjs/common";
import { SizesService } from "./sizes.service";
import { SizesController } from "./sizes.controller";
import { RetailersService } from "../retailers/retailers.service";
import { UsersService } from "../users/users.service";
import { ImagesService } from "../images/images.service";
import { EwalletsService } from "../ewallets/ewallets.service";

@Module({
  controllers: [SizesController],
  providers: [
    SizesService,
    RetailersService,
    UsersService,
    ImagesService,
    EwalletsService,
  ],
})
export class SizesModule {}
