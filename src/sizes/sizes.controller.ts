import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { SizesService } from "./sizes.service";
import { AuthGuard } from "../auth/auth.guard";
import { GetAllSizesParam } from "./dto/get-all-sizes.param";
import { CreateSizeDto } from "./dto/create-size.dto";

@Controller("sizes")
export class SizesController {
  constructor(private readonly sizesService: SizesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createSizeDto: CreateSizeDto) {
    return this.sizesService.create(createSizeDto);
  }

  @Get()
  findAll(@Query() queryParamsDto: GetAllSizesParam) {
    return this.sizesService.findAll(+queryParamsDto.retailerId);
  }

  @Get(":sizeId")
  findOne(@Param("sizeId") sizeId: number) {
    return this.sizesService.findOne(+sizeId);
  }

  @UseGuards(AuthGuard)
  @Delete(":sizeId")
  remove(@Param("sizeId") sizeId: number) {
    return this.sizesService.remove(+sizeId);
  }
}
