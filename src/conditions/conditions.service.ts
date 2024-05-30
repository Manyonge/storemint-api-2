import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { CreateConditionDto } from "./dto/create-condition.dto";

@Injectable()
export class ConditionsService {
  constructor(private prisma: PrismaService) {}

  async create(createConditionDto: CreateConditionDto) {
    try {
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
      return await this.prisma.condition.create({
        data: createConditionDto,
      });
    } catch (e) {
      console.log(e);
      if (e instanceof BadRequestException) {
        throw e;
      }
      throw new InternalServerErrorException();
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
      if (e instanceof BadRequestException) {
        throw e;
      }
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.condition.findUnique({
        where: { id, deletedAt: null },
      });
    } catch (e) {
      console.log(e);
      if (e instanceof BadRequestException) {
        throw e;
      }
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    try {
      const condition = await this.prisma.condition.findUnique({
        where: { id, deletedAt: null },
      });
      if (!condition) {
        throw new BadRequestException("condition not found");
      }
      const deletedAt = new Date();
      return await this.prisma.condition.update({
        where: { id },
        data: { deletedAt: deletedAt.toISOString() },
      });
    } catch (e) {
      console.log(e);
      if (e instanceof BadRequestException) {
        throw e;
      }
      throw new InternalServerErrorException();
    }
  }
}
