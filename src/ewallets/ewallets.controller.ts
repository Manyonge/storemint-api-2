import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EwalletsService } from './ewallets.service';
import { CreateEwalletDto } from './dto/create-ewallet.dto';
import { UpdateEwalletDto } from './dto/update-ewallet.dto';

@Controller('ewallets')
export class EwalletsController {
  constructor(private readonly ewalletsService: EwalletsService) {}

  @Post()
  create(@Body() createEwalletDto: CreateEwalletDto) {
    return this.ewalletsService.create(createEwalletDto);
  }

  @Get()
  findAll() {
    return this.ewalletsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ewalletsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEwalletDto: UpdateEwalletDto) {
    return this.ewalletsService.update(+id, updateEwalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ewalletsService.remove(+id);
  }
}
