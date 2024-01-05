import { PickType } from "@nestjs/mapped-types";
import { Condition } from "../entities/condition.entity";

export class CreateConditionDto extends PickType(Condition, [
  "condition",
  "retailerId",
] as const) {}
