import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateConditionDto {
  @IsNotEmpty()
  @IsString()
  condition: string;
  @IsNotEmpty()
  @IsInt()
  retailerId: number;
}
