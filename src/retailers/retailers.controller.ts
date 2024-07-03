import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { QueryParamDto } from "./dto/query-params.dto";
import { RetailersService } from "./retailers.service";
import { CheckIdParamPipe } from "../pipes/check-id-param-pipe.service";

@Controller("retailers")
export class RetailersController {
  constructor(private readonly retailersService: RetailersService) {}

  @Get()
  findAll(@Req() queryParamDto: QueryParamDto) {
    return this.retailersService.findAll(queryParamDto);
  }

  @Get(":id")
  findOne(@Param("id", new CheckIdParamPipe()) id: string) {
    return this.retailersService.findById(+id);
  }
  @UseGuards(AuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateRetailerDto: any) {
    return this.retailersService.update(+id, updateRetailerDto);
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.retailersService.remove(+id);
  }
}
