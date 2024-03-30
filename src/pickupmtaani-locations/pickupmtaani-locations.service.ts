import { Injectable } from "@nestjs/common";
import { CreatePickupmtaaniLocationDto } from "./dto/create-pickupmtaani-location.dto";
import { UpdatePickupmtaaniLocationDto } from "./dto/update-pickupmtaani-location.dto";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class PickupmtaaniLocationsService {
  constructor(private prisma: PrismaService) {}
  async create(createPickupmtaaniLocationDto: CreatePickupmtaaniLocationDto) {
    return await this.prisma.pickupmtaaniLocation.create({
      data: createPickupmtaaniLocationDto,
    });
  }

  async findAll() {
    return await this.prisma.pickupmtaaniLocation.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.pickupmtaaniLocation.findUnique({ where: { id } });
  }

  async update(
    id: number,
    updatePickupmtaaniLocationDto: UpdatePickupmtaaniLocationDto,
  ) {
    return await this.prisma.pickupmtaaniLocation.update({
      where: { id },
      data: updatePickupmtaaniLocationDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.pickupmtaaniLocation.delete({ where: { id } });
  }
}
