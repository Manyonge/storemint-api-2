import { PickType } from "@nestjs/mapped-types";
import { Customer } from "../entities/customer.entity";

export class CreateCustomerDto extends PickType(Customer, [
  "name",
  "phone",
  "email",
  "retailerId",
] as const) {
  instagramHandle?: string;
}
