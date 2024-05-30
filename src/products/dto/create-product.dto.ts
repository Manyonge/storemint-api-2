import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  @IsNumber()
  price: string;
  @IsNotEmpty()
  @IsNumber()
  stock: string;
  @IsNotEmpty()
  @IsNumber()
  retailerId: string;
  @IsNotEmpty()
  @IsBoolean()
  isHidden: string;
  @IsNotEmpty()
  @IsString()
  category: string;
  @IsNotEmpty()
  @IsString()
  size: string;
  @IsNotEmpty()
  @IsString()
  condition: string;
}
