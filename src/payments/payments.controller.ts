import { Body, Controller, Post } from "@nestjs/common";
import { PaymentsService } from "./payments.service";

@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post("initiate")
  create(@Body() initiatePaymentDto: any) {
    return this.paymentsService.initiate(initiatePaymentDto);
  }
}
