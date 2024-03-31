import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { ProviderEnum, RoleEnum } from "./enums";
import { CreateWithPasswordDto } from "./dtos/create-with-password.dto";
import { CreateWithoutPasswordDto } from "./dtos/create-without-password.dto";
import { PrismaService } from "nestjs-prisma";
import { CreateStaffUserDto } from "./dtos/create-staff-user.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async createWithPassword(createWithPasswordDto: CreateWithPasswordDto) {
    const hashedPassword = await this.hashPassword(
      createWithPasswordDto.password,
    );

    const user = await this.prisma.user.create({
      data: {
        email: createWithPasswordDto.businessEmail,
        phoneNumber: createWithPasswordDto.businessPhone,
        name: createWithPasswordDto.ownerName,
        hash: hashedPassword,
        role: RoleEnum.STORE_ADMIN,
        provider: ProviderEnum.EMAIL,
      },
    });
    return user.uid;
  }

  async createWithoutPassword(
    createWithoutPasswordDto: CreateWithoutPasswordDto,
  ) {
    const user = await this.prisma.user.create({
      data: {
        email: createWithoutPasswordDto.email,
        name: createWithoutPasswordDto.ownerName,
        role: RoleEnum.STORE_ADMIN,
        provider: ProviderEnum.GOOGLE,
      },
    });
    return user.uid;
  }
  async createStaffUser(createStaffDto: CreateStaffUserDto) {
    try {
      const hash = await this.hashPassword(createStaffDto?.password);
      return await this.prisma.user.create({
        data: {
          name: createStaffDto?.name,
          email: createStaffDto?.email,
          phoneNumber: createStaffDto?.phoneNumber,
          hash,
          role: RoleEnum.STORE_STAFF,
          provider: ProviderEnum.EMAIL,
        },
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async hashPassword(password: string) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async comparePasswords(plainTextPassword: string, hashedPassword: string) {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }
  async isEmailExistent(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return !!user;
  }

  async findByEmailProvider(email: string): Promise<{
    uid: number;
    email: string;
    phoneNumber: string;
    name: string;
    hash: string;
    role: "STORE_ADMIN";
  }> {
    return await this.prisma.user.findUnique({
      where: { email, provider: ProviderEnum.EMAIL },
    });
  }

  async findByGoogleProvider(email: string): Promise<{
    uid: number;
    email: string;
    phoneNumber: string;
    name: string;
    hash: string;
    role: "STORE_ADMIN";
  }> {
    return await this.prisma.user.findUnique({
      where: { email, provider: ProviderEnum.GOOGLE },
    });
  }
}
