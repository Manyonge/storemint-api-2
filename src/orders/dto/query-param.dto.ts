import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { OrderStateEnum } from "../../users/enums";

export class QueryParamDto {
  @IsNotEmpty()
  retailerId: string;
  @IsOptional()
  @IsEnum(OrderStateEnum)
  state: OrderStateEnum;
}
