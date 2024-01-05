import { Injectable } from '@nestjs/common';
import { CreateEwalletDto } from './dto/create-ewallet.dto';
import { UpdateEwalletDto } from './dto/update-ewallet.dto';

@Injectable()
export class EwalletsService {
  create(createEwalletDto: CreateEwalletDto) {
    return 'This action adds a new ewallet';
  }

  findAll() {
    return `This action returns all ewallets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ewallet`;
  }

  update(id: number, updateEwalletDto: UpdateEwalletDto) {
    return `This action updates a #${id} ewallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} ewallet`;
  }
}
