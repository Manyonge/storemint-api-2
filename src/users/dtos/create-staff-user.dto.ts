import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateStaffUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  password: string;
}
