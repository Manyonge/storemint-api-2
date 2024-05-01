import { PumRegionEnum } from "../../users/enums";
import { IsEnum, IsOptional } from "class-validator";

export class QueryParamDto {
  @IsOptional()
  @IsEnum(PumRegionEnum)
  region: PumRegionEnum;
}
