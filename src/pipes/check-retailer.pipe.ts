import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { isWholeNumber } from "../helpers";

@Injectable()
export class CheckRetailerPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService) {}

  async transform(value: any) {
    try {
      if (!!value?.retailerId) {
        const retailerId = value.retailerId;
        if (!isWholeNumber(retailerId)) {
          throw new BadRequestException(
            "retailerId must be a whole number greater than 0",
          );
        }
        const retailer = await this.prisma.retailer.findFirst({
          where: { id: Number(retailerId), deletedAt: null, isActivated: true },
        });

        if (!retailer) {
          throw new BadRequestException("Retailer not found");
        }
        if (!retailer.isActivated) {
          throw new BadRequestException("Retailer account deactivated");
        }
      }
      return value;
    } catch (e) {
      throw e;
    }
  }
}
