import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateConditionDto } from "./dto/create-condition.dto";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class ConditionsService {
  constructor(private prisma: PrismaService) {}

  async create(createConditionDto: CreateConditionDto) {
    const conditionExists = await this.prisma.condition.findUnique({
      where: {
        retailerId: createConditionDto.retailerId,
        condition: createConditionDto.condition,
        deletedAt: null,
      },
    });
    if (conditionExists) {
      throw new BadRequestException("Condition already exists");
    }
    try {
      return await this.prisma.condition.create({
        data: createConditionDto,
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException("Operation failed!");
    }
  }

  async findAll(retailerId: number) {
    try {
      return await this.prisma.condition.findMany({
        orderBy: { createdAt: "desc" },
        where: { retailerId, deletedAt: null },
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException("Operation failed!");
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.condition.findUnique({
        where: { id, deletedAt: null },
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException("Operation failed!");
    }
  }

  async remove(id: number) {
    const condition = await this.prisma.condition.findUnique({
      where: { id, deletedAt: null },
    });
    if (!condition) {
      throw new BadRequestException("condition not found");
    }
    try {
      const deletedAt = new Date();
      return await this.prisma.condition.update({
        where: { id },
        data: { deletedAt: deletedAt.toISOString() },
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException("Operation failed!");
    }
  }
}
