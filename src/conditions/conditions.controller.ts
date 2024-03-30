import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ConditionsService } from "./conditions.service";
import { AuthGuard } from "../auth/auth.guard";
import { QueryParamDto } from "./dto/query-param.dto";
import { CreateConditionDto } from "./dto/create-condition.dto";
import { CheckParamIdPipe } from "../pipes/check-param-id.pipe.";

@Controller("conditions")
export class ConditionsController {
  constructor(private readonly conditionsService: ConditionsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createConditionDto: CreateConditionDto) {
    return this.conditionsService.create(createConditionDto);
  }

  @Get()
  findAll(@Query() queryParamDto: QueryParamDto) {
    return this.conditionsService.findAll(+queryParamDto.retailerId);
  }

  @Get(":id")
  findOne(@Param("id", new CheckParamIdPipe()) id: string) {
    return this.conditionsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  remove(@Param("id", new CheckParamIdPipe()) id: string) {
    return this.conditionsService.remove(+id);
  }
}
