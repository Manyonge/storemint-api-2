import { IsNotEmpty, IsString } from "class-validator";

export class GetAllSizesParam {
  @IsNotEmpty()
  @IsString()
  retailerId: string;
}
