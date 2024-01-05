import { IsNotEmpty } from "class-validator";

export class PickupmtaaniLocation {
  id: number;
  @IsNotEmpty()
  location: string;
}
