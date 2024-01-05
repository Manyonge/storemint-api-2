import { PartialType } from '@nestjs/mapped-types';
import { CreateEwalletDto } from './create-ewallet.dto';
import { Ewallet } from "../entities/ewallet.entity";

export class UpdateEwalletDto extends PartialType(Ewallet) {}
