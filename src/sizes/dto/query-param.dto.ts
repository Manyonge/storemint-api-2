import { IsNotEmpty } from "class-validator";

export class QueryParamDto {
  @IsNotEmpty()
  retailerId: string;
}
