import { IsNotEmpty } from "class-validator";

export class CreateImageParamDto {
  @IsNotEmpty()
  productId: string;
  @IsNotEmpty()
  position: string;
}
