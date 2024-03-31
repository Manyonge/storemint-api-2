import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";
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
      where: { email: createStaffDto.email },
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

  findAll() {
    return `This action returns all staff`;
  }

  findOne(id: number) {
    return `This action returns a #${id} staff`;
  }

  update(id: number, updateStaffDto: UpdateStaffDto) {
    return `This action updates a #${id} staff`;
  }

  remove(id: number) {
    return `This action removes a #${id} staff`;
  }
}
