import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PumService } from './pum.service';
import { CreatePumDto } from './dto/create-pum.dto';
import { UpdatePumDto } from './dto/update-pum.dto';

@Controller('pum')
export class PumController {
  constructor(private readonly pumService: PumService) {}

  @Post()
  create(@Body() createPumDto: CreatePumDto) {
    return this.pumService.create(createPumDto);
  }

  @Get()
  findAll() {
    return this.pumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pumService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePumDto: UpdatePumDto) {
    return this.pumService.update(+id, updatePumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pumService.remove(+id);
  }
}
