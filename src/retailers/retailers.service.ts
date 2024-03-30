import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateRetailerDto } from "./dto/create-retailer.dto";
import { UpdateRetailerDto } from "./dto/update-retailer.dto";
import { UsersService } from "../users/users.service";
import { ImagesService } from "../images/images.service";
import { Express, Request } from "express";
import { CreateWithPasswordDto } from "../users/dtos/create-with-password.dto";
import { CreateThroughGoogleDto } from "./dto/create-through-google.dto";
import { PrismaService } from "nestjs-prisma";
import { EwalletsService } from "../ewallets/ewallets.service";

@Injectable()
export class RetailersService {
  constructor(
    private prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly imagesService: ImagesService,
    private readonly ewalletsService: EwalletsService,
  ) {}

  async signUpWithEmail(
    createRetailerDto: CreateRetailerDto,
    files: {
      businessLogo?: Express.Multer.File[];
      passportPhoto?: Express.Multer.File[];
    },
  ) {
    //confirm if email is new
    const isEmailExistent = await this.usersService.isEmailExistent(
      createRetailerDto.businessEmail,
    );
    if (isEmailExistent) {
      throw new HttpException(
        "email is already in use",
        HttpStatus.BAD_REQUEST,
      );
    }

    const uid = await this.usersService.createWithPassword(createRetailerDto);

    const { publicUrl: logoPublic } = await this.imagesService.uploadImage(
      "business logos",
      files.businessLogo[0],
    );

    const { publicUrl: passportPublic } = await this.imagesService.uploadImage(
      "passport photos",
      files.passportPhoto[0],
    );

    // create retailer and get new retailerId
    const retailer = await this.prisma.retailer.create({
      data: {
        uid,
        businessName: createRetailerDto.businessName,
        businessEmail: createRetailerDto.businessEmail,
        businessLogo: logoPublic,
        passportPhoto: passportPublic,
        businessInstagram: createRetailerDto.businessInstagram,
        nationalId: createRetailerDto.idNumber,
      },
    });

    //create new wallet balance}
    await this.ewalletsService.create(retailer.id);

    return { retailerId: retailer.id, businessName: retailer.businessName };
  }
  async isBusinessNameExistent(businessName: string) {
    const retailer = await this.prisma.retailer.findUnique({
      where: {
        businessName,
      },
    });
    return !!retailer;
  }

  async createThruEmail(
    createAuthDto: CreateWithPasswordDto,
    uid: number,
    files: {
      businessLogo?: Express.Multer.File[];
      passportPhoto?: Express.Multer.File[];
    },
  ) {
    const { publicUrl: logoPublic } = await this.imagesService.uploadImage(
      "business logos",
      files.businessLogo[0],
    );

    const { publicUrl: passportPublic } = await this.imagesService.uploadImage(
      "passport photos",
      files.passportPhoto[0],
    );
    const retailer = await this.prisma.retailer.create({
      data: {
        uid,
        businessName: createAuthDto.businessName,
        businessEmail: createAuthDto.businessEmail,
        businessLogo: logoPublic,
        passportPhoto: passportPublic,
        businessInstagram: createAuthDto.businessInstagram,
        nationalId: createAuthDto.idNumber,
      },
    });
    return retailer.id;
  }

  async createThroughGoogle(createThroughGoogleDto: CreateThroughGoogleDto) {
    const retailer = await this.prisma.retailer.create({
      data: {
        uid: createThroughGoogleDto.uid,
        businessEmail: createThroughGoogleDto.businessEmail,
      },
    });
    return retailer.id;
  }

  async findAll(request: Request) {
    const businessName = request.query.businessName;
    let response;
    if (businessName) {
      response = await this.prisma.retailer.findUnique({
        where: { businessName: businessName as string },
      });
    } else {
      response = await this.prisma.retailer.findMany();
    }
    return response;
  }

  async findById(id: number) {
    return await this.prisma.retailer.findUnique({ where: { id } });
  }
  async findByUid(uid: number) {
    return await this.prisma.retailer.findUnique({ where: { uid } });
  }

  async update(id: number, updateRetailerDto: UpdateRetailerDto) {
    return await this.prisma.retailer.update({
      where: { id },
      data: updateRetailerDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.retailer.delete({ where: { id } });
  }
}
