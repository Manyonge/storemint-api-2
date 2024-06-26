import { IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";
import { OrderTypeEnum } from "../../users/enums/order-type.enum";
import { OrderStateEnum } from "../../users/enums";

export class UpdateOrderDto {
  @IsOptional()
  @IsEnum(OrderTypeEnum)
  type: OrderTypeEnum;
  @IsOptional()
  @IsEnum(OrderStateEnum)
  state: OrderStateEnum;
  @IsOptional()
  @IsInt()
  @Min(120, { message: "delivery fee must be at least Ksh 120" })
  deliveryFee: number;
  @IsOptional()
  @IsString()
  clientName: string;
  @IsOptional()
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
}
