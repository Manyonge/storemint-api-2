import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { CustomersService } from "./customers.service";
import { AuthGuard } from "../auth/auth.guard";
import { QueryParamDto } from "./dto/query-param.dto";

@Controller("customers")
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCustomerDto: any) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  findAll(@Query() queryParams: QueryParamDto) {
    return this.customersService.findAll(+queryParams.retailerId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.customersService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCustomerDto: any,
  ) {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.customersService.remove(+id);
  }
}
