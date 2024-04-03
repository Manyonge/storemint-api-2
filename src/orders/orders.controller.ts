import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { CheckIdParamPipe } from "../pipes/check-id-param-pipe.service";
import { QueryParamDto } from "./dto/query-param.dto";

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto): Promise<any> {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll(@Query() queryParamDto: QueryParamDto) {
    return this.ordersService.findAll(+queryParamDto.retailerId);
  }

  @Get(":id")
  findOne(@Param("id", new CheckIdParamPipe()) id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id", new CheckIdParamPipe()) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(":id")
  remove(@Param("id", new CheckIdParamPipe()) id: string) {
    return this.ordersService.remove(+id);
  }
}
