import { IsInt, IsNotEmpty } from "class-validator";

export class Size {
  id: number;
  @IsNotEmpty()
  size: string;
  @IsNotEmpty()
  @IsInt()
  retailerId: number;
  createdAt: string;
}
