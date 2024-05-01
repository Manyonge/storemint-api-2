import { Controller, Get, Param, Query } from "@nestjs/common";
import { PumService } from "./pum.service";
import { QueryParamDto } from "./dto/query-param.dto";

@Controller("pum")
export class PumController {
  constructor(private readonly pumService: PumService) {}

  @Get("locations")
  findAll(@Query() queryParams: QueryParamDto) {
    return this.pumService.findAllLocations(queryParams);
  }

  @Get("locations/:id/agents")
  findOne(@Param("id") id: string) {
    return this.pumService.findLocationAgents(+id);
  }
}
