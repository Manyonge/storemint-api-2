import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  stock: string;
  @IsNotEmpty()
  @IsNumber()
  retailerId: string;
  @IsNotEmpty()
  @IsBoolean()
  isHidden: string;

  @IsOptional()
  @IsString()
  category?: string;
  @IsOptional()
  @IsString()
  size?: string;
  @IsOptional()
  @IsString()
  condition?: string;
  @IsOptional()
  @IsInt()
  conditionRating?: number;
}
