import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateConditionDto } from "./dto/create-condition.dto";
import { RetailersService } from "../retailers/retailers.service";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class ConditionsService {
  constructor(
    private prisma: PrismaService,
    private readonly retailersService: RetailersService,
  ) {}

  async create(createConditionDto: CreateConditionDto) {
    const isConditionExistent = await this.isConditionExistent(
      createConditionDto.condition,
      createConditionDto.retailerId,
    );
    if (isConditionExistent) {
      throw new HttpException(
        "Condition already exists",
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.prisma.condition.create({
      data: createConditionDto,
    });
  }

  async findAll(retailerId: number) {
    return await this.prisma.condition.findMany({
      orderBy: { createdAt: "desc" },
      where: { retailerId },
    });
  }

  async findOne(id: number) {
    return await this.prisma.condition.findUnique({ where: { id } });
  }

  async remove(id: number) {
    return await this.prisma.condition.delete({ where: { id } });
  }

  async isConditionExistent(condition: string, retailerId: number) {
    const foundCondition = await this.prisma.condition.findUnique({
      where: { condition, retailerId },
    });
    return !!foundCondition;
  }
}
