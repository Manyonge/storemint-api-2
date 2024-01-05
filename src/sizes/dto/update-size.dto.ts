import { PickType } from "@nestjs/mapped-types";
import { Size } from "../entities/size.entity";

export class UpdateSizeDto extends PickType(Size, [
  "size",
  "retailerId",
] as const) {}
