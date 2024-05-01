import { IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";
import { ShiftEnum } from "../../users/enums";

export class CreateAgentPackageDto {
  @IsNotEmpty()
  @IsString()
  customerName: string;
  @IsNotEmpty()
  @IsString()
  customerPhoneNumber: string;
  @IsNotEmpty()
  @IsInt()
  senderAgentID_id: number;
  @IsNotEmpty()
  @IsInt()
  receieverAgentID_id: number;
  @IsNotEmpty()
  @IsString()
  fromLocation: string;
  @IsNotEmpty()
  @IsString()
  toLocation: string;
  @IsNotEmpty()
  @IsString()
  packageName: string;
  @IsNotEmpty()
  @IsInt()
  package_value: number;
  @IsNotEmpty()
  @IsInt()
  total_fee: number;
  @IsNotEmpty()
  @IsString()
  color: string;
  @IsNotEmpty()
  @IsInt()
  on_delivery_balance: number;
  @IsNotEmpty()
  @IsEnum(ShiftEnum)
  shift: ShiftEnum;
}
