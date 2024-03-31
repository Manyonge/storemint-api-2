import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateWithoutPasswordDto {
  @IsNotEmpty()
  ownerName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
