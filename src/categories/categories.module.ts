import { Module } from "@nestjs/common";
import { CategoriesController } from "./categories.controller";
import { RetailersService } from "../retailers/retailers.service";
import { UsersService } from "../users/users.service";
import { ImagesService } from "../images/images.service";
import { CategoriesService } from "./categories.service";
import { EwalletsService } from "../ewallets/ewallets.service";

@Module({
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    RetailersService,
    UsersService,
    ImagesService,
    EwalletsService,
  ],
})
export class CategoriesModule {}
