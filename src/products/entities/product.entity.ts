import { IsBoolean, IsInt, IsNotEmpty } from "class-validator";

export class Product {
  id: number;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  @IsInt()
  price: number;
  @IsNotEmpty()
  @IsInt()
  stock: number;
  @IsNotEmpty()
  @IsBoolean()
  isHidden: boolean;
  @IsNotEmpty()
  @IsInt()
  retailerId: number;
  @IsNotEmpty()
  category: string;
  @IsNotEmpty()
  size: string;
  @IsNotEmpty()
  condition: string;
  createdAt: string;
}
