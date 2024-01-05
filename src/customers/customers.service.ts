import { Injectable } from "@nestjs/common";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}
  async create(createCustomerDto: CreateCustomerDto) {
    return await this.prisma.customer.create({
      data: createCustomerDto,
    });
  }

  async findAll(retailerId: number) {
    return await this.prisma.customer.findMany({ where: { retailerId } });
  }

  async findOne(id: number) {
    return await this.prisma.customer.findUnique({ where: { id } });
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return await this.prisma.customer.update({
      where: { id },
      data: updateCustomerDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.customer.delete({ where: { id } });
  }
}
