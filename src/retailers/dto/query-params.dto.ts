import { IsOptional, IsString } from "class-validator";

export class QueryParamDto {
  @IsOptional()
  @IsString()
  businessName: string;
}
