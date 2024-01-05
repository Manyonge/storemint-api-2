import { IsEmail, IsInt, IsNotEmpty } from "class-validator";

export class Customer {
  id: number;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  instagramHandle: string;
  @IsNotEmpty()
  @IsInt()
  retailerId: number;
}
