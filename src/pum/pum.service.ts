import { Injectable } from '@nestjs/common';
import { CreatePumDto } from './dto/create-pum.dto';
import { UpdatePumDto } from './dto/update-pum.dto';

@Injectable()
export class PumService {
  create(createPumDto: CreatePumDto) {
    return 'This action adds a new pum';
  }

  findAll() {
    return `This action returns all pum`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pum`;
  }

  update(id: number, updatePumDto: UpdatePumDto) {
    return `This action updates a #${id} pum`;
  }

  remove(id: number) {
    return `This action removes a #${id} pum`;
  }
}
