import { PickType } from "@nestjs/mapped-types";
import { Retailer } from "../entities/retailer.entity";
import { IsNotEmpty } from "class-validator";

export class CreateRetailerDto extends PickType(Retailer, [
  "uid",
  "ownerName",
  "businessName",
  "businessEmail",
  "idNumber",
  "businessInstagram",
  "businessPhone",
] as const) {
  @IsNotEmpty()
  password: string;
}
