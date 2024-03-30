import { IsInt, IsNotEmpty } from "class-validator";

export class SizeIdParam {
  @IsInt()
  @IsNotEmpty()
  id: number;
}
