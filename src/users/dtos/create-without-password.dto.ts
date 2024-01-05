import { IsNotEmpty } from "class-validator";

export class CreateWithoutPasswordDto {
  @IsNotEmpty()
  ownerName: string;

  @IsNotEmpty()
  email: string;
}
