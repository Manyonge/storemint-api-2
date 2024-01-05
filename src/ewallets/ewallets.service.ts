import { Injectable } from "@nestjs/common";
import { UpdateEwalletDto } from "./dto/update-ewallet.dto";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class EwalletsService {
  constructor(private prisma: PrismaService) {}
  async create(retailerId: number) {
    return await this.prisma.ewallet.create({
      data: {
        retailerId: retailerId,
        balance: 0,
      },
    });
  }

  findAll() {
    return " all ewallets";
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
