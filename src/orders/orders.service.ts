import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}
  async create(createOrderDto: CreateOrderDto): Promise<any> {
    const validProducts = [];
    for (let i = 0; i < createOrderDto.productIds.length; i++) {
      const product = await this.prisma.storeProduct.findUnique({
        where: {
          id: createOrderDto.productIds[i],
        },
      });
      if (product.stock < 1) {
        throw new BadRequestException(
          "one or all of these products are already sold out",
        );
      } else {
        validProducts.push(product);
      }
    }
    try {
      const order = await this.prisma.order.create({
        data: {
          retailerId: createOrderDto.retailerId,
          type: createOrderDto.type,
          deliveryFee: createOrderDto.deliveryFee,
          clientName: createOrderDto.clientName,
          clientPhone: createOrderDto.clientPhone,
          receiverLocation: createOrderDto.receiverLocation,
          receiverAgent: createOrderDto.receiverAgent,
          doorstepAddress: createOrderDto.doorstepAddress,
          balance: createOrderDto.balance,
          errandLocation: createOrderDto.errandLocation,
          errandSacco: createOrderDto.errandSacco,
          specialInstructions: createOrderDto.specialInstructions,
        },
      });
      for (let i = 0; i < validProducts.length; i++) {
        //find the product and update its stock before creating orderproduct record

        await this.prisma.storeProduct.update({
          where: {
            id: validProducts[i].id,
          },
          data: { stock: validProducts[i].stock - 1 },
        });

        await this.prisma.orderStoreProduct.create({
          data: {
            orderId: order.id,
            productId: validProducts[i].id,
            retailerId: createOrderDto.retailerId,
          },
        });
      }
      return order;
    } catch (e) {
      console.log(e);
      throw new BadRequestException("operation failed");
    }
  }

  async findAll(retailerId: number): Promise<any> {
    try {
      return await this.prisma.order.findMany({
        where: {
          retailerId,
          deletedAt: null,
        },
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException("operation failed");
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return updateOrderDto;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
