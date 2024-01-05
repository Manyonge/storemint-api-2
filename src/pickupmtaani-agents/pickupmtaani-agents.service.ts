import { Injectable } from '@nestjs/common';
import { CreatePickupmtaaniAgentDto } from './dto/create-pickupmtaani-agent.dto';
import { UpdatePickupmtaaniAgentDto } from './dto/update-pickupmtaani-agent.dto';

@Injectable()
export class PickupmtaaniAgentsService {
  create(createPickupmtaaniAgentDto: CreatePickupmtaaniAgentDto) {
    return 'This action adds a new pickupmtaaniAgent';
  }

  findAll() {
    return `This action returns all pickupmtaaniAgents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pickupmtaaniAgent`;
  }

  update(id: number, updatePickupmtaaniAgentDto: UpdatePickupmtaaniAgentDto) {
    return `This action updates a #${id} pickupmtaaniAgent`;
  }

  remove(id: number) {
    return `This action removes a #${id} pickupmtaaniAgent`;
  }
}
