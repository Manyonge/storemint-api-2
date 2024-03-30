import { IsInt, IsNotEmpty } from "class-validator";

export class Category {
  id: number;
  @IsNotEmpty()
  category: string;
  @IsNotEmpty()
  @IsInt()
  retailerId: number;
}
