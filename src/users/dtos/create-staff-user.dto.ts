import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateStaffUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  phoneNumber: string;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  password: string;
}
