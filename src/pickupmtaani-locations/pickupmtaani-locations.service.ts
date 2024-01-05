import { Injectable } from '@nestjs/common';
import { CreatePickupmtaaniLocationDto } from './dto/create-pickupmtaani-location.dto';
import { UpdatePickupmtaaniLocationDto } from './dto/update-pickupmtaani-location.dto';

@Injectable()
export class PickupmtaaniLocationsService {
  create(createPickupmtaaniLocationDto: CreatePickupmtaaniLocationDto) {
    return 'This action adds a new pickupmtaaniLocation';
  }

  findAll() {
    return `This action returns all pickupmtaaniLocations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pickupmtaaniLocation`;
  }

  update(id: number, updatePickupmtaaniLocationDto: UpdatePickupmtaaniLocationDto) {
    return `This action updates a #${id} pickupmtaaniLocation`;
  }

  remove(id: number) {
    return `This action removes a #${id} pickupmtaaniLocation`;
  }
}
