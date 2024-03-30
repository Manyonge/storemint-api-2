import { PickType } from "@nestjs/mapped-types";
import { Size } from "../entities/size.entity";

export class CreateSizeDto extends PickType(Size, [
  "size",
  "retailerId",
] as const) {}
