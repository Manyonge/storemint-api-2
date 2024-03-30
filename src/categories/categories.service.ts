import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const categoryExists = await this.isCategoryExistent(
        createCategoryDto.category,
        createCategoryDto.retailerId,
      );
      if (categoryExists) {
        throw new BadRequestException("Category already exists");
      }
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
        where: { retailerId },
        orderBy: { category: "asc" },
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException("Operation failed!");
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.category.findUnique({ where: { id } });
    } catch (e) {
      console.log(e);
      throw new BadRequestException("Operation failed!");
    }
  }

  async remove(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new BadRequestException("category not found");
    }
    try {
      return await this.prisma.category.delete({ where: { id } });
    } catch (e) {
      console.log(e);
      throw new BadRequestException("Operation failed!");
    }
  }

  async isCategoryExistent(category: string, retailerId: number) {
    const foundCategory = await this.prisma.category.findUnique({
      where: { category, retailerId },
    });
    return !!foundCategory;
  }
}
