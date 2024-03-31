import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateThroughGoogleDto {
  @IsNotEmpty()
  uid: number;
  @IsNotEmpty()
  @IsEmail()
  businessEmail: string;
}
