import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const categoryExists = await this.prisma.category.findUnique({
      where: {
        category: createCategoryDto.category,
        retailerId: createCategoryDto.retailerId,
        deletedAt: null,
      },
    });
    if (categoryExists) {
      throw new BadRequestException("Category already exists");
    }
    try {
      return await this.prisma.category.create({
        data: createCategoryDto,
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException("Operation failed!");
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
      throw new BadRequestException("Operation failed!");
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.category.findUnique({
        where: { id, deletedAt: null },
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException("Operation failed!");
    }
  }

  async remove(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id, deletedAt: null },
    });
    if (!category) {
      throw new BadRequestException("category not found");
    }
    try {
      const deletedAt = new Date();
      return await this.prisma.category.update({
        where: { id },
        data: { deletedAt: deletedAt.toISOString() },
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException("Operation failed!");
    }
  }
}
