import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PickupmtaaniAgentsService } from './pickupmtaani-agents.service';
import { CreatePickupmtaaniAgentDto } from './dto/create-pickupmtaani-agent.dto';
import { UpdatePickupmtaaniAgentDto } from './dto/update-pickupmtaani-agent.dto';

@Controller('pickupmtaani-agents')
export class PickupmtaaniAgentsController {
  constructor(private readonly pickupmtaaniAgentsService: PickupmtaaniAgentsService) {}

  @Post()
  create(@Body() createPickupmtaaniAgentDto: CreatePickupmtaaniAgentDto) {
    return this.pickupmtaaniAgentsService.create(createPickupmtaaniAgentDto);
  }

  @Get()
  findAll() {
    return this.pickupmtaaniAgentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pickupmtaaniAgentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePickupmtaaniAgentDto: UpdatePickupmtaaniAgentDto) {
    return this.pickupmtaaniAgentsService.update(+id, updatePickupmtaaniAgentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pickupmtaaniAgentsService.remove(+id);
  }
}
