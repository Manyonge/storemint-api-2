import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  category: string;
  @IsNotEmpty()
  @IsInt()
  retailerId: number;
}
