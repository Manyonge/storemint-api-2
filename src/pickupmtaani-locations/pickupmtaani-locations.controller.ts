import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PickupmtaaniLocationsService } from './pickupmtaani-locations.service';
import { CreatePickupmtaaniLocationDto } from './dto/create-pickupmtaani-location.dto';
import { UpdatePickupmtaaniLocationDto } from './dto/update-pickupmtaani-location.dto';

@Controller('pickupmtaani-locations')
export class PickupmtaaniLocationsController {
  constructor(private readonly pickupmtaaniLocationsService: PickupmtaaniLocationsService) {}

  @Post()
  create(@Body() createPickupmtaaniLocationDto: CreatePickupmtaaniLocationDto) {
    return this.pickupmtaaniLocationsService.create(createPickupmtaaniLocationDto);
  }

  @Get()
  findAll() {
    return this.pickupmtaaniLocationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pickupmtaaniLocationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePickupmtaaniLocationDto: UpdatePickupmtaaniLocationDto) {
    return this.pickupmtaaniLocationsService.update(+id, updatePickupmtaaniLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pickupmtaaniLocationsService.remove(+id);
  }
}
