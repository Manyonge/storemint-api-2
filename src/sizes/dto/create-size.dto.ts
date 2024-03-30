import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateSizeDto {
  @IsNotEmpty()
  @IsString()
  size: string;
  @IsNotEmpty()
  @IsInt()
  retailerId: number;
}
