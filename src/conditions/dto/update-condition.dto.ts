import { PartialType } from "@nestjs/mapped-types";
import { Condition } from "../entities/condition.entity";

export class UpdateConditionDto extends PartialType(Condition) {}
