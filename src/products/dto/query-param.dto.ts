import { IsNotEmpty, IsOptional } from "class-validator";

export class QueryParamDto {
  @IsNotEmpty()
  retailerId: string;

  @IsOptional()
  page?: number;
  @IsOptional()
  limit?: number;
}
