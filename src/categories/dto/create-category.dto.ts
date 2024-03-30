import { IsInt, IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty()
  category: string;
  @IsNotEmpty()
  @IsInt()
  retailerId: number;
}
