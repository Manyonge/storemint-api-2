import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}
  async create(createOrderDto: CreateOrderDto): Promise<any> {
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
      for (let i = 0; i < createOrderDto.productIds.length; i++) {
        await this.prisma.orderStoreProduct.create({
          data: {
            orderId: order.id,
            productId: createOrderDto.productIds[i],
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

  findAll() {
    return `This action returns all orders`;
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
