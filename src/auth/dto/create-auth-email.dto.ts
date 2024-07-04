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
      "business name can only have one word with no spaces, lowercase letters & '-' or '_'",
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
