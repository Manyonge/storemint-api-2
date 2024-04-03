import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}
  async create(createOrderDto: CreateOrderDto) {
    try {
      const order = await this.prisma.order.create({ data: createOrderDto });
      for (const id in createOrderDto.productIds) {
        await this.prisma.orderProduct.create({
          data: {
            orderId: order.id,
            productId: id,
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
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
