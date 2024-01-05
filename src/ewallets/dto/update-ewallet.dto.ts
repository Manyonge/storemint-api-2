import { PartialType } from '@nestjs/mapped-types';
import { CreateEwalletDto } from './create-ewallet.dto';

export class UpdateEwalletDto extends PartialType(CreateEwalletDto) {}
