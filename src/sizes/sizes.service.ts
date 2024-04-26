import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateSizeDto } from "./dto/create-size.dto";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class SizesService {
  constructor(private prisma: PrismaService) {}
  async create(createSizeDto: CreateSizeDto) {
    const sizeExists = await this.prisma.size.findUnique({
      where: {
        size: createSizeDto.size,
        retailerId: createSizeDto.retailerId,
        deletedAt: null,
      },
    });
    if (sizeExists) {
      throw new BadRequestException("size already exists");
    }
    try {
      return await this.prisma.size.create({
        data: createSizeDto,
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException("Operation failed!");
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
      throw new BadRequestException("Operation failed!");
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.size.findUnique({
        where: { id, deletedAt: null },
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException("Operation failed!");
    }
  }

  async remove(id: number) {
    const size = await this.prisma.size.findUnique({
      where: { id, deletedAt: null },
    });
    if (!size) {
      throw new BadRequestException("size not found");
    }
    try {
      const deletedAt = new Date();
      return await this.prisma.size.update({
        where: { id },
        data: {
          deletedAt: deletedAt.toISOString(),
        },
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException("Operation failed!");
    }
  }
}
