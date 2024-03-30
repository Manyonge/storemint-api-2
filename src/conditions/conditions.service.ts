import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateConditionDto } from "./dto/create-condition.dto";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class ConditionsService {
  constructor(private prisma: PrismaService) {}

  async create(createConditionDto: CreateConditionDto) {
    try {
      const conditionExists = await this.isConditionExistent(
        createConditionDto.condition,
        createConditionDto.retailerId,
      );
      if (conditionExists) {
        throw new BadRequestException("Condition already exists");
      }

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
        where: { retailerId },
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException("Operation failed!");
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.condition.findUnique({ where: { id } });
    } catch (e) {
      console.log(e);
      throw new BadRequestException("Operation failed!");
    }
  }

  async remove(id: number) {
    const condition = await this.prisma.condition.findUnique({
      where: { id },
    });
    if (!condition) {
      throw new BadRequestException("condition not found");
    }
    try {
      return await this.prisma.condition.delete({ where: { id } });
    } catch (e) {
      console.log(e);
      throw new BadRequestException("Operation failed!");
    }
  }

  async isConditionExistent(condition: string, retailerId: number) {
    try {
      const foundCondition = await this.prisma.condition.findUnique({
        where: { condition, retailerId },
      });
      return !!foundCondition;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
