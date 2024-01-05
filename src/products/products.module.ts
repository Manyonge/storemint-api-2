import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { ImagesService } from "../images/images.service";
import { RetailersService } from "../retailers/retailers.service";
import { UsersService } from "../users/users.service";
import { EwalletsService } from "../ewallets/ewallets.service";

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ImagesService,
    RetailersService,
    UsersService,
    EwalletsService,
  ],
})
export class ProductsModule {}
