import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { OrderStateEnum } from "../../users/enums";

export class QueryParamDto {
  @IsNotEmpty()
  retailerId: number;
  @IsOptional()
  @IsEnum(OrderStateEnum)
  state: OrderStateEnum;
}
