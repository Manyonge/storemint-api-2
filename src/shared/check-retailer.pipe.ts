import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class CheckRetailerPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService) {
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    if (
      (value && value.retailerId) ||
      (metadata.type === "query" &&
        value &&
        value.query &&
        value.query.hasOwnProperty("retailerId"))
    ) {
      const retailerId = value
        ? value.retailerId || (value.query && value.query.retailerId)
        : undefined;
      const retailer = await this.prisma.retailer.findUnique({
        where: { id: Number(retailerId) },
      });

      if (!retailer) {
        throw new BadRequestException("Retailer not found");
      }
    }
    return value;
  }
}
