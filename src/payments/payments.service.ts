import { Injectable } from "@nestjs/common";
import { InitiatePaymentDto } from "./dto/initiate-payment.dto";

@Injectable()
export class PaymentsService {
  async initiate(createPaymentDto: InitiatePaymentDto) {
    return "This action adds a new payment";
  }

  async handleStkCallback() {}
}
