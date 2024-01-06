import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { RetailersService } from "../retailers/retailers.service";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class CategoriesService {
  constructor(
    private prisma: PrismaService,
    private readonly retailersService: RetailersService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const isCategoryExistent = await this.isCategoryExistent(
      createCategoryDto.category,
      createCategoryDto.retailerId,
    );
    if (isCategoryExistent) {
      throw new HttpException(
        "Category already exists",
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async findAll(retailerId: number) {
    return await this.prisma.category.findMany({
      where: { retailerId },
      orderBy: { category: "asc" },
    });
  }

  async findOne(id: number) {
    return await this.prisma.category.findUnique({ where: { id } });
  }

  async remove(id: number) {
    return await this.prisma.category.delete({ where: { id } });
  }

  async isCategoryExistent(category: string, retailerId: number) {
    const foundCategory = await this.prisma.category.findUnique({
      where: { category, retailerId },
    });
    return !!foundCategory;
  }
}
