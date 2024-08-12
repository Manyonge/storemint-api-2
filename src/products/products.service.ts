import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { Request } from "express";
import { PrismaService } from "nestjs-prisma";
import { ImagesService } from "../images/images.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { UploadedFilesDto } from "./dto/uploaded-files.dto";

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private readonly imagesService: ImagesService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      return await this.prisma.storeProduct.create({
        data: createProductDto as any,
      });
    } catch (e) {
      console.log(e);
      if (e instanceof BadRequestException) {
        throw e;
      }
      throw new InternalServerErrorException();
    }
  }

  async findAll(retailerId: number, request: Request) {
    try {
      if (request.query.inStock && +request.query.inStock === 1) {
        return await this.prisma.storeProduct.findMany({
          orderBy: { createdAt: "desc" },
          where: { retailerId, deletedAt: null, stock: { gt: 0 } },
        });
      }
      if (request.query.inStock && +request.query.inStock === 0) {
        return await this.prisma.storeProduct.findMany({
          orderBy: { createdAt: "desc" },
          where: { retailerId, deletedAt: null, stock: 0 },
        });
      }

      if (request.query.isHidden && +request.query.isHidden === 1) {
        return await this.prisma.storeProduct.findMany({
          orderBy: { createdAt: "desc" },
          where: { retailerId, deletedAt: null, isHidden: true },
        });
      }

      if (request.query.category) {
        return await this.prisma.storeProduct.findMany({
          orderBy: { createdAt: "desc" },
          where: {
            retailerId,
            deletedAt: null,
            category: request.query.category as string,
          },
        });
      }

      if (request.query.size) {
        return await this.prisma.storeProduct.findMany({
          orderBy: { createdAt: "desc" },
          where: {
            retailerId,
            deletedAt: null,
            size: request.query.size as string,
          },
        });
      }

      if (request.query.condition) {
        return await this.prisma.storeProduct.findMany({
          orderBy: { createdAt: "desc" },
          where: {
            retailerId,
            deletedAt: null,
            condition: request.query.condition as string,
          },
        });
      } else {
        return await this.prisma.storeProduct.findMany({
          orderBy: { createdAt: "desc" },
          where: { retailerId, deletedAt: null },
        });
      }
    } catch (e) {
      console.log(e);
      if (e instanceof BadRequestException) {
        throw e;
      }
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.storeProduct.findUnique({
        where: { id, deletedAt: null },
        include: {
          images: true,
        },
      });
    } catch (e) {
      console.log(e);
      if (e instanceof BadRequestException) {
        throw e;
      }
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      return await this.prisma.storeProduct.update({
        where: { id },
        data: updateProductDto as any,
      });
    } catch (e) {
      console.log(e);
      if (e instanceof BadRequestException) {
        throw e;
      }
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    try {
      const product = await this.prisma.storeProduct.findUnique({
        where: { id, deletedAt: null },
      });
      if (!product) throw new BadRequestException("product not found");
      const deletedAt = new Date();
      const productImages = await this.prisma.productImage.findMany({
        where: { productId: id, deletedAt: null },
      });
      if (productImages.length > 0) {
        for (let i = 0; i < productImages.length; i++) {
          await this.prisma.productImage.update({
            where: { id: productImages[i].id },
            data: {
              updatedAt: deletedAt.toISOString(),
              deletedAt: deletedAt.toISOString(),
            },
          });
        }
      }
      return await this.prisma.storeProduct.update({
        where: { id },
        data: {
          updatedAt: deletedAt.toISOString(),
          deletedAt: deletedAt.toISOString(),
        },
      });
    } catch (e) {
      console.log(e);
      if (e instanceof BadRequestException) {
        throw e;
      }
      throw new InternalServerErrorException();
    }
  }

  async createOneProductImage(
    productId: number,
    position: number,
    file: UploadedFilesDto,
  ) {
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
      console.log(e);
      if (e instanceof BadRequestException) {
        throw e;
      }
      throw new InternalServerErrorException();
    }
  }

  async findAllProductImages(productId: number) {
    try {
      return await this.prisma.productImage.findMany({
        where: { productId, deletedAt: null },
        orderBy: { position: "asc" },
      });
    } catch (e) {
      console.log(e);
      if (e instanceof BadRequestException) {
        throw e;
      }
      throw new InternalServerErrorException();
    }
  }

  async findOneProductImage(imageId: number) {
    try {
      return await this.prisma.productImage.findUnique({
        where: { id: imageId, deletedAt: null },
      });
    } catch (e) {
      console.log(e);
      if (e instanceof BadRequestException) {
        throw e;
      }
      throw new InternalServerErrorException();
    }
  }

  async deleteOneProductImage(imageId: number) {
    try {
      const deletedAt = new Date();
      return await this.prisma.productImage.update({
        where: { id: imageId },
        data: { deletedAt: deletedAt.toISOString() },
      });
    } catch (e) {
      console.log(e);
      if (e instanceof BadRequestException) {
        throw e;
      }
      throw new InternalServerErrorException();
    }
  }
}
