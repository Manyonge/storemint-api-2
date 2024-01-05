import { IsNotEmpty } from "class-validator";

export class UploadedFilesDto {
  @IsNotEmpty()
  file: Express.Multer.File;
}
