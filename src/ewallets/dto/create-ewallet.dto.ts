import { PickType } from "@nestjs/mapped-types";
import { Ewallet } from "../entities/ewallet.entity";

export class CreateEwalletDto extends PickType(Ewallet, ["retailerId", "balance"] as const){}
