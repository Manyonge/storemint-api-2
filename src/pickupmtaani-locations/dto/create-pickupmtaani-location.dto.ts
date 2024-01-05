import { PickType } from "@nestjs/mapped-types";
import { PickupmtaaniLocation } from "../entities/pickupmtaani-location.entity";

export class CreatePickupmtaaniLocationDto extends PickType(
  PickupmtaaniLocation,
  ["location"] as const,
) {}
