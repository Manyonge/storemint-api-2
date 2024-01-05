import { PartialType } from "@nestjs/mapped-types";
import { CreateWithPasswordDto } from "../../users/dtos/create-with-password.dto";

export class UpdateAuthDto extends PartialType(CreateWithPasswordDto) {}
