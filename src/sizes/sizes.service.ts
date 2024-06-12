import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { CreateSizeDto } from "./dto/create-size.dto";

@Injectable()
export class SizesService {
  constructor(private prisma: PrismaService) {}
  async create(createSizeDto: CreateSizeDto) {
    try {
      const sizeExists = await this.prisma.size.findFirst({
        where: {
          size: createSizeDto.size,
          retailerId: createSizeDto.retailerId,
          deletedAt: null,
        },
      });
      if (sizeExists) {
        throw new BadRequestException("size already exists");
      }
      return await this.prisma.size.create({
        data: createSizeDto,
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
      return await this.prisma.size.findMany({
        orderBy: { size: "desc" },
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
      return await this.prisma.size.findUnique({
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
      const size = await this.prisma.size.findUnique({
        where: { id, deletedAt: null },
      });
      if (!size) {
        throw new BadRequestException("size not found");
      }
      const deletedAt = new Date();
      return await this.prisma.size.update({
        where: { id },
        data: {
          deletedAt: deletedAt.toISOString(),
        },
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
