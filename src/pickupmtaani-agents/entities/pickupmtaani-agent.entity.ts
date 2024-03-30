import { IsNotEmpty } from "class-validator";

export class PickupmtaaniAgent {
  id: number;
  @IsNotEmpty()
  agent: string;
  @IsNotEmpty()
  locationId: number;
  createAt: string;
}
