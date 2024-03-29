import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { SizesService } from "./sizes.service";
import { AuthGuard } from "../auth/auth.guard";
import { QueryParamDto } from "./dto/query-param.dto";

@Controller("sizes")
export class SizesController {
  constructor(private readonly sizesService: SizesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createSizeDto: any) {
    return this.sizesService.create(createSizeDto);
  }

  @Get()
  findAll(@Query() queryParamsDto: QueryParamDto) {
    return this.sizesService.findAll(+queryParamsDto.retailerId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.sizesService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.sizesService.remove(+id);
  }
}
