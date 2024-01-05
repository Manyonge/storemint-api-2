import { PickType } from "@nestjs/mapped-types";
import { Product } from "../entities/product.entity";

export class CreateProductDto extends PickType(Product, [
  "name",
  "description",
  "price",
  "stock",
  "retailerId",
  "isHidden",
  "category",
  "size",
  "condition",
] as const) {}
