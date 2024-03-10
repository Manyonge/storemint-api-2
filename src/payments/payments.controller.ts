import { Body, Controller, Post } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { InitiatePaymentDto } from "./dto/initiate-payment.dto";

@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post("initiate")
  create(@Body() initiatePaymentDto: InitiatePaymentDto) {
    return this.paymentsService.initiate(initiatePaymentDto);
  }
}
