import { IsInt, IsNotEmpty } from "class-validator";

export class Ewallet {
  id: number;
  @IsInt()
  @IsNotEmpty()
  retailerId: number;
  @IsInt()
  @IsNotEmpty()
  balance: number;
  createdAt: Date;
  updateAt: Date;
}
