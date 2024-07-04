import { IsNotEmpty } from "class-validator";

export class CreateAuthEmailFilesDto {
  @IsNotEmpty()
  businessLogo: Express.Multer.File[];
}
