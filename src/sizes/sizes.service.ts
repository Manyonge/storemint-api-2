import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateSizeDto } from "./dto/create-size.dto";
import { RetailersService } from "../retailers/retailers.service";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class SizesService {
  constructor(
    private prisma: PrismaService,
    private readonly retailersService: RetailersService,
  ) {}
  async create(createSizeDto: CreateSizeDto) {
    try {
      const sizeExists = await this.isSizeExistent(
        createSizeDto.size,
        createSizeDto.retailerId,
      );
      if (sizeExists) {
        return new BadRequestException("size already exists");
      }

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
        where: { retailerId },
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException("Operation failed!");
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.size.findUnique({ where: { id } });
    } catch (e) {
      console.log(e);
      throw new BadRequestException("Operation failed!");
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.size.delete({ where: { id } });
    } catch (e) {
      console.log(e);
      throw new BadRequestException("Operation failed!");
    }
  }

  async isSizeExistent(size: string, retailerId: number) {
    try {
      const foundSize = await this.prisma.size.findUnique({
        where: { size, retailerId },
      });
      return !!foundSize;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
