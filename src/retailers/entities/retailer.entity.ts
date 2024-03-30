import { IsNotEmpty } from "class-validator";

export class Retailer {
  uid: number;
  id: number;
  @IsNotEmpty()
  ownerName: string;
  @IsNotEmpty()
  businessName: string;
  @IsNotEmpty()
  businessEmail: string;
  @IsNotEmpty()
  passportPhoto: string;
  @IsNotEmpty()
  businessLogo: string;
  @IsNotEmpty()
  idNumber: string;
  @IsNotEmpty()
  businessInstagram: string;
  @IsNotEmpty()
  businessPhone: string;
  createdAt: string;
}
