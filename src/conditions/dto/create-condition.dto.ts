import { IsInt, IsNotEmpty } from "class-validator";

export class CreateConditionDto {
  @IsNotEmpty()
  condition: string;
  @IsNotEmpty()
  @IsInt()
  retailerId: number;
}
