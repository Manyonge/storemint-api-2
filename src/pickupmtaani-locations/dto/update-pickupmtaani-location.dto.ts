import { PartialType } from '@nestjs/mapped-types';
import { CreatePickupmtaaniLocationDto } from './create-pickupmtaani-location.dto';

export class UpdatePickupmtaaniLocationDto extends PartialType(CreatePickupmtaaniLocationDto) {}
