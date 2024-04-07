import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { PrismaService } from "nestjs-prisma";
import { QueryParamDto } from "./dto/query-param.dto";

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
        throw new BadRequestException(`${product.name} is sold out`);
      } else {
        validProducts.push(product);
      }
    }
    try {
      const order = await this.prisma.order.create({
        data: {
          retailerId: createOrderDto.retailerId,
          type: createOrderDto.type,
          state: createOrderDto.state,
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

  async findAll(queryParamDto: QueryParamDto): Promise<any> {
    try {
      if (!!queryParamDto.state) {
        return await this.prisma.order.findMany({
          where: {
            retailerId: parseInt(queryParamDto.retailerId),
            state: queryParamDto.state,
            deletedAt: null,
          },
          orderBy: { createdAt: "desc" },
        });
      }
      return await this.prisma.order.findMany({
        where: {
          retailerId: parseInt(queryParamDto.retailerId),
          deletedAt: null,
        },
        orderBy: { createdAt: "desc" },
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException("operation failed");
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      return await this.prisma.order.findUnique({
        where: {
          id,
          deletedAt: null,
        },
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException("operation failed");
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<any> {
    const order = await this.prisma.order.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });
    if (!order) throw new BadRequestException("order not found");
    try {
      const updatedAt = new Date();
      return await this.prisma.order.update({
        where: { id },
        data: { ...updateOrderDto, updatedAt: updatedAt.toISOString() },
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException("operation failed");
    }
  }

  async remove(id: number): Promise<any> {
    const order = await this.prisma.order.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });
    if (!order) throw new BadRequestException("order not found");
    try {
      const deletedAt = new Date();
      await this.prisma.order.update({
        where: { id },
        data: {
          updatedAt: deletedAt.toISOString(),
          deletedAt: deletedAt.toISOString(),
        },
      });
      const orderStoreProducts = await this.prisma.orderStoreProduct.findMany({
        where: {
          orderId: id,
        },
        orderBy: { createdAt: "desc" },
      });
      if (orderStoreProducts.length > 0) {
        for (let i = 0; i < orderStoreProducts.length; i++) {
          await this.prisma.orderStoreProduct.update({
            where: {
              id: orderStoreProducts[i].id,
            },
            data: {
              updatedAt: deletedAt.toISOString(),
              deletedAt: deletedAt.toISOString(),
            },
          });
        }
      }
      return true;
    } catch (e) {
      console.log(e);
      throw new BadRequestException("operation failed");
    }
  }

  async findOrderProducts(id: number): Promise<any> {
    const order = await this.prisma.order.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });
    if (!order) throw new BadRequestException("order not found");
    try {
      const products = await this.prisma.orderStoreProduct.findMany({
        where: {
          orderId: id,
          deletedAt: null,
        },
        orderBy: { createdAt: "desc" },
        include: {
          product: true,
        },
      });
      const orderList = [];
      if (products.length > 0) {
        for (let i = 0; i < products.length; i++) {
          const product = { ...products[i].product };
          orderList.push(product);
        }
      }
      return orderList;
    } catch (e) {
      console.log(e);
      throw new BadRequestException("operation failed");
    }
  }
}
