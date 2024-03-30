import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
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
    const isSizeExistent = await this.isSizeExistent(
      createSizeDto.size,
      createSizeDto.retailerId,
    );
    if (isSizeExistent) {
      throw new HttpException("Size already exists", HttpStatus.BAD_REQUEST);
    }

    return await this.prisma.size.create({
      data: createSizeDto,
    });
  }

  async findAll(retailerId: number) {
    return await this.prisma.size.findMany({
      orderBy: { size: "desc" },
      where: { retailerId },
    });
  }

  async findOne(id: number) {
    return await this.prisma.size.findUnique({ where: { id } });
  }

  async remove(id: number) {
    return await this.prisma.size.delete({ where: { id } });
  }

  async isSizeExistent(size: string, retailerId: number) {
    const foundSize = await this.prisma.size.findUnique({
      where: { size, retailerId },
    });
    return !!foundSize;
  }
}
