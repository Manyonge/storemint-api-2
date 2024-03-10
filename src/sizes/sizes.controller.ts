import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { SizesService } from "./sizes.service";
import { CreateSizeDto } from "./dto/create-size.dto";
import { AuthGuard } from "../auth/auth.guard";
import { QueryParamDto } from "./dto/query-param.dto";

@Controller("api/sizes")
export class SizesController {
  constructor(private readonly sizesService: SizesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createSizeDto: CreateSizeDto) {
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
