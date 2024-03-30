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
import { CategoriesService } from "./categories.service";
import { AuthGuard } from "../auth/auth.guard";
import { QueryParamDto } from "./dto/query-param.dto";
import { CheckIdParamPipe } from "../pipes/check-id-param-pipe.service";

@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCategoryDto: any) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll(@Query() queryParamDto: QueryParamDto) {
    return this.categoriesService.findAll(+queryParamDto.retailerId);
  }

  @Get(":id")
  findOne(@Param("id", new CheckIdParamPipe()) id: string) {
    return this.categoriesService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  remove(@Param("id", new CheckIdParamPipe()) id: string) {
    return this.categoriesService.remove(+id);
  }
}
