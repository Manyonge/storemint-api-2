import { OrderTypeEnum } from "../../users/enums/order-type.enum";
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from "class-validator";
import { OrderStateEnum } from "../../users/enums";

export class CreateOrderDto {
  @IsNotEmpty()
  @IsInt()
  retailerId: number;
  @IsNotEmpty()
  @IsEnum(OrderStateEnum)
  state: OrderStateEnum;
  @IsNotEmpty()
  @IsEnum(OrderTypeEnum)
  type: OrderTypeEnum;
  @IsNotEmpty()
  @IsInt()
  @Min(120, { message: "delivery fee must be at least Ksh 120" })
  deliveryFee: number;
  @IsNotEmpty()
  @IsString()
  clientName: string;
  @IsNotEmpty()
  @IsString()
  clientPhone: string;
  @IsOptional()
  @IsString()
  receiverLocation: string;
  @IsOptional()
  @IsString()
  receiverAgent: string;
  @IsOptional()
  @IsString()
  doorstepAddress: string;
  @IsOptional()
  @IsInt()
  balance: number;
  @IsOptional()
  @IsString()
  errandLocation: string;
  @IsOptional()
  @IsString()
  errandSacco: string;
  @IsOptional()
  @IsString()
  specialInstructions: string;
  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  productIds: number[];
}
