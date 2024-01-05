import { IsNotEmpty } from "class-validator";

export class ImageQueryDto {
  @IsNotEmpty()
  productId: string;
}
