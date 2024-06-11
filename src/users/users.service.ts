import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { ProviderEnum, RoleEnum } from "./enums";
import { CreateWithPasswordDto } from "./dtos/create-with-password.dto";
import { CreateWithoutPasswordDto } from "./dtos/create-without-password.dto";
import { PrismaService } from "nestjs-prisma";

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

  async hashPassword(password: string) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async comparePasswords(plainTextPassword: string, hashedPassword: string) {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }
  async isEmailExistent(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
        deletedAt: null,
      },
    });
    return !!user;
  }

  async findByEmailProvider(email: string): Promise<any> {
    return await this.prisma.user.findFirst({
      where: { email, provider: ProviderEnum.EMAIL, deletedAt: null },
    });
  }

  async findByGoogleProvider(email: string): Promise<any> {
    return await this.prisma.user.findFirst({
      where: { email, provider: ProviderEnum.GOOGLE, deletedAt: null },
    });
  }
}
