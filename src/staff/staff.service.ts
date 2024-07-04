import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { PrismaService } from "nestjs-prisma";
import { UsersService } from "../users/users.service";
import { RetailersService } from "../retailers/retailers.service";
import { ProviderEnum, RoleEnum } from "../users/enums";

@Injectable()
export class StaffService {
  constructor(
    private prisma: PrismaService,
    private readonly usersService: UsersService,

    private readonly retailersService: RetailersService,
  ) {}

  async create(createStaffDto: CreateStaffDto) {
    if (createStaffDto?.confirmPassword !== createStaffDto?.password) {
      throw new BadRequestException("Passwords do not match");
    }
    //check if user exists
    const user = await this.prisma.user.findFirst({
      where: {
        email: createStaffDto.email,
        deletedAt: null,
        isActivated: true,
      },
    });
    if (!!user) throw new BadRequestException("staff member already exists!");
    try {
      const hash = await this.usersService.hashPassword(
        createStaffDto.password,
      );
      //create user
      const user = await this.prisma.user.create({
        data: {
          name: createStaffDto.name,
          phoneNumber: createStaffDto.phoneNumber,
          email: createStaffDto.email,
          hash,
          role: RoleEnum.STORE_STAFF,
          provider: ProviderEnum.EMAIL,
        },
      });
      //create staff}
      return await this.prisma.staff.create({
        data: {
          uid: user.uid,
          name: createStaffDto.name,
          phoneNumber: createStaffDto.phoneNumber,
          email: createStaffDto.email,
          retailerId: createStaffDto.retailerId,
        },
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException("Operation failed!");
    }
  }

  async findAll(retailerId: number) {
    try {
      return await this.prisma.staff.findMany({
        where: {
          retailerId,
        },
        orderBy: {
          name: "asc",
        },
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException("Operation failed");
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.staff.findUnique({
        where: { id },
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException("Operation failed");
    }
  }

  async remove(id: number) {
    const staff = await this.prisma.staff.findUnique({ where: { id } });
    if (!staff) throw new BadRequestException("staff not found");
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          uid: staff.uid,
          deletedAt: null,
          isActivated: true,
        },
      });
      await this.prisma.staff.delete({ where: { id } });
      if (user) {
        await this.prisma.user.delete({ where: { uid: user.uid } });
      }
      return staff;
    } catch (e) {
      console.log(e);
      throw new BadRequestException("operation failed");
    }
  }
}
