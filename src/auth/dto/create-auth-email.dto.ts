import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

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
  @Matches(/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/, {
    message:
      "business name can only be one word with no spaces, have lowercase letters and '-' or '_'",
  })
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
