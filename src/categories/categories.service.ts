import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.prisma.category.findUnique({
        where: {
          category: createCategoryDto.category,
          retailerId: createCategoryDto.retailerId,
          deletedAt: null,
        },
      });
      if (category) {
        throw new BadRequestException("Category already exists");
      }
      return await this.prisma.category.create({
        data: createCategoryDto,
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
      return await this.prisma.category.findMany({
        where: { retailerId, deletedAt: null },
        orderBy: { category: "asc" },
      });
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.category.findUnique({
        where: { id, deletedAt: null },
      });
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    try {
      const category = await this.prisma.category.findUnique({
        where: { id, deletedAt: null },
      });
      if (!category) {
        throw new BadRequestException("category not found");
      }
      const deletedAt = new Date();
      return await this.prisma.category.update({
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
