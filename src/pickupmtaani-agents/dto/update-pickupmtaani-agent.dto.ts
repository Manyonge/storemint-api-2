import { PartialType } from '@nestjs/mapped-types';
import { CreatePickupmtaaniAgentDto } from './create-pickupmtaani-agent.dto';

export class UpdatePickupmtaaniAgentDto extends PartialType(CreatePickupmtaaniAgentDto) {}
