import { Request } from "express";
import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ImagesService } from "../images/images.service";
import { UploadedFilesDto } from "./dto/uploaded-files.dto";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private readonly imagesService: ImagesService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return await this.prisma.storeProduct.create({
      data: createProductDto as any,
    });
  }

  async findAll(retailerId: number, request: Request) {
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
  }

  async findOne(id: number) {
    return await this.prisma.storeProduct.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.prisma.storeProduct.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    const product = this.prisma.storeProduct.findUnique({
      where: { id, deletedAt: null },
    });
    if (!product) throw new BadRequestException("product not found");
    try {
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
      throw new BadRequestException("operation failed");
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
      throw new BadRequestException("operation failed");
    }
  }

  async findAllProductImages(productId: number) {
    return await this.prisma.productImage.findMany({
      where: { productId, deletedAt: null },
      orderBy: { position: "asc" },
    });
  }

  async findOneProductImage(imageId: number) {
    return await this.prisma.productImage.findUnique({
      where: { id: imageId, deletedAt: null },
    });
  }

  async deleteOneProductImage(imageId: number) {
    const deletedAt = new Date();
    return await this.prisma.productImage.update({
      where: { id: imageId },
      data: { deletedAt: deletedAt.toISOString() },
    });
  }
}
