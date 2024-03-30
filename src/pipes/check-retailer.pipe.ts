import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { isStringWholeNumber } from "../helpers";

@Injectable()
export class CheckRetailerPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      if (!!value?.retailerId) {
        const retailerId = value.retailerId;
        if (!isStringWholeNumber(retailerId)) {
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
      }
      return value;
    } catch (e) {
      throw e;
    }
  }
}
