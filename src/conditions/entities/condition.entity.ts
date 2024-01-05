import { IsInt, IsNotEmpty } from "class-validator";

export class Condition {
  id: number;
  @IsNotEmpty()
  condition: string;
  @IsNotEmpty()
  @IsInt()
  retailerId: number;
  createdAt: string;
}
