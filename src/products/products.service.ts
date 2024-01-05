import { Request } from "express";
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ImagesService } from "../images/images.service";
import { RetailersService } from "../retailers/retailers.service";
import { UploadedFilesDto } from "./dto/uploaded-files.dto";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private readonly imagesService: ImagesService,
    private readonly retailersService: RetailersService,
  ) {}
  async create(createProductDto: CreateProductDto) {
    return this.prisma.storeProduct.create({
      data: createProductDto as any,
    });
  }

  async findAll(retailerId: number, request: Request) {
    if (request.query.inStock && +request.query.inStock === 1) {
      return this.prisma.storeProduct.findMany({
        orderBy: { createdAt: "desc" },
        where: { retailerId, stock: { gt: 0 } },
      });
    }
    if (request.query.inStock && +request.query.inStock === 0) {
      return this.prisma.storeProduct.findMany({
        orderBy: { createdAt: "desc" },
        where: { retailerId, stock: 0 },
      });
    }

    if (request.query.isHidden && +request.query.isHidden === 1) {
      return this.prisma.storeProduct.findMany({
        orderBy: { createdAt: "desc" },
        where: { retailerId, isHidden: true },
      });
    }

    if (request.query.category) {
      return this.prisma.storeProduct.findMany({
        orderBy: { createdAt: "desc" },
        where: { retailerId, category: request.query.category as string },
      });
    }

    if (request.query.size) {
      return this.prisma.storeProduct.findMany({
        orderBy: { createdAt: "desc" },
        where: { retailerId, size: request.query.size as string },
      });
    }

    if (request.query.condition) {
      return this.prisma.storeProduct.findMany({
        orderBy: { createdAt: "desc" },
        where: { retailerId, condition: request.query.condition as string },
      });
    } else {
      return this.prisma.storeProduct.findMany({
        orderBy: { createdAt: "desc" },
        where: { retailerId },
      });
    }
  }

  async findOne(id: number) {
    return await this.prisma.storeProduct.findUnique({ where: { id } });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.prisma.storeProduct.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    const productImages = await this.findAllProductImages(id);
    if (productImages.length > 0) {
      for (let i = 0; i < productImages.length; i++) {
        await this.imagesService.deleteByFilepath(productImages[i].filepath);
      }
    }
    await this.prisma.storeProduct.delete({ where: { id } });
  }

  async createOneProductImage(
    productId: number,
    position: number,
    file: UploadedFilesDto,
  ) {
    const product = await this.findOne(productId);
    if (!product) {
      throw new BadRequestException("Product does not exist");
    }
    try {
      const { publicUrl, filepath } = await this.imagesService.uploadImage(
        "product images",
        file[0] as any,
      );
      return await this.prisma.productImage.create({
        data: {
          productId,
          publicUrl,
          filepath,
          position,
        },
      });
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
  async findAllProductImages(productId: number) {
    return await this.prisma.productImage.findMany({
      where: { productId },
      orderBy: { position: "asc" },
    });
  }
  async findOneProductImage(imageId: number) {
    return await this.prisma.productImage.findUnique({
      where: { id: imageId },
    });
  }
  async deleteOneProductImage(imageId: number) {
    const image = await this.findOneProductImage(imageId);
    await this.imagesService.deleteByFilepath(image.filepath);

    return await this.prisma.productImage.delete({ where: { id: imageId } });
  }
}
