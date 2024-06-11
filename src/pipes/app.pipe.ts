import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { isWholeNumber } from "../helpers";

@Injectable()
export class AppPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService) {}
  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      if (!!value?.retailerId) {
        await this.checkRetailerId(value);
      }
      if (!!value?.productId) {
        await this.checkProductId(value);
      }
      if (!!value?.imageId) {
        await this.checkImageId(value);
      }
      if (!!value?.productIds) {
        for (let i = 0; i < value.productIds.length; i++) {
          await this.checkProductId({ productId: value.productIds[i] });
        }
      }
      if (metadata?.type === "param" && metadata?.data === "id") {
        await this.checkId(value);
      }
      return value;
    } catch (e) {
      throw e;
    }
  }

  async checkRetailerId(value: any) {
    const retailerId = value.retailerId;
    if (!isWholeNumber(retailerId)) {
      throw new BadRequestException(
        "retailerId must be a whole number greater than 0",
      );
    }
    const retailer = await this.prisma.retailer.findFirst({
      where: { id: Number(retailerId), deletedAt: null },
    });
    if (!retailer) {
      throw new BadRequestException("Retailer not found");
    }
    return value;
  }
  async checkProductId(value: any) {
    const productId = value.productId;
    if (!isWholeNumber(productId)) {
      throw new BadRequestException(
        "productId must be a whole number greater than 0",
      );
    }
    const product = await this.prisma.storeProduct.findUnique({
      where: { id: Number(productId), deletedAt: null },
    });
    if (!product) {
      throw new BadRequestException("Product not found");
    }
    return value;
  }
  async checkImageId(value: any) {
    const imageId = value.imageId;
    if (!isWholeNumber(imageId)) {
      throw new BadRequestException(
        "imageId must be a whole number greater than 0",
      );
    }
    const image = await this.prisma.productImage.findUnique({
      where: { id: Number(imageId), deletedAt: null },
    });
    if (!image) {
      throw new BadRequestException("Image not found");
    }
    return value;
  }
  async checkId(value: any) {
    const id = value;
    if (!isWholeNumber(id)) {
      throw new BadRequestException("id must be a whole number greater than 0");
    }
    return value;
  }
}
