import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { EwalletsService } from "../ewallets/ewallets.service";
import { ImagesService } from "../images/images.service";
import { UsersService } from "../users/users.service";
import { QueryParamDto } from "./dto/query-params.dto";
import { UpdateRetailerDto } from "./dto/update-retailer.dto";

@Injectable()
export class RetailersService {
  constructor(
    private prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly imagesService: ImagesService,
    private readonly ewalletsService: EwalletsService,
  ) {}

  async findAll(queryParamDto: QueryParamDto) {
    try {
      const businessName = queryParamDto.businessName;

      if (businessName) {
        return await this.prisma.retailer.findFirst({
          where: {
            businessName: businessName as string,
            deletedAt: null,
            isActivated: true,
          },
        });
      }
      return await this.prisma.retailer.findMany({
        where: {
          isActivated: true,
          deletedAt: null,
        },
      });
    } catch (e: any) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async findById(id: number) {
    try {
      return await this.prisma.retailer.findUnique({
        where: { id, deletedAt: null },
      });
    } catch (e: any) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateRetailerDto: UpdateRetailerDto) {
    try {
      return await this.prisma.retailer.update({
        where: { id },
        data: updateRetailerDto,
      });
    } catch (e: any) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    try {
      const date = new Date();
      return await this.prisma.retailer.update({
        where: { id },
        data: {
          deletedAt: date,
        },
      });
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
