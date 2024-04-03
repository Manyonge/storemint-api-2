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
        return await this.checkRetailerId(value);
      }
      if (!!value?.productId) {
        return await this.checkProductId(value);
      }
      if (!!value?.productIds && Array.isArray(value.productIds)) {
        for (const id in value.productIds) {
          await this.checkProductId(id);
        }
        return value;
      }
      if (metadata?.type === "param" && metadata?.data === "id") {
        return await this.checkId(value);
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
    const retailer = await this.prisma.retailer.findUnique({
      where: { id: Number(retailerId) },
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
      where: { id: Number(productId) },
    });
    if (!product) {
      throw new BadRequestException("Product not found");
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
