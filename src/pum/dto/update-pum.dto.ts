import { PartialType } from '@nestjs/mapped-types';
import { CreatePumDto } from './create-pum.dto';

export class UpdatePumDto extends PartialType(CreatePumDto) {}
