import { OrderTypeEnum } from "../../users/enums/OrderType.enum";

export class Order {
  id: number;

  retailerId: number;

  type: OrderTypeEnum;

  deliveryFee: number;
  clientName: string;
  clientPhone: string;

  receiverLocation: string;

  receiverAgent: string;

  doorstepAddress: string;

  balance: number;

  errandLocation: string;

  errandSacco: string;

  specialInstructions: string;
}
