import { IsNotEmpty } from "class-validator";

export class CreateGoogleSigninDto {
  @IsNotEmpty()
  credential: string;
}
