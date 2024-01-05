import { IsNotEmpty } from "class-validator";

export class CreateWithPasswordDto {
  @IsNotEmpty()
  ownerName: string;
  @IsNotEmpty()
  businessName: string;
  @IsNotEmpty()
  businessEmail: string;
  //the following two will be extracted by files interceptor
  // @IsNotEmpty()
  // passportPhoto: string;
  // @IsNotEmpty()
  // businessLogo: string;
  @IsNotEmpty()
  idNumber: string;
  @IsNotEmpty()
  businessInstagram: string;
  @IsNotEmpty()
  businessPhone: string;
  @IsNotEmpty()
  password: string;
}
