import { IsNotEmpty } from "class-validator";

export class CreateThroughGoogleDto {
  @IsNotEmpty()
  uid: number;
  @IsNotEmpty()
  businessEmail: string;
}
