import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateAuthEmailDto {
  @IsNotEmpty()
  @IsString()
  businessPhone: string;
  @IsNotEmpty()
  @IsString()
  ownerName: string;

  @IsNotEmpty()
  @IsEmail()
  businessEmail: string;
  @IsNotEmpty()
  @IsString()
  businessName: string;
  @IsNotEmpty()
  @IsString()
  businessInstagram: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}
