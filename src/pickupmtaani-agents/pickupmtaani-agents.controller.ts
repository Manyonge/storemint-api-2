import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { PickupmtaaniAgentsService } from "./pickupmtaani-agents.service";
import { AuthGuard } from "../auth/auth.guard";
import { QueryParamDto } from "./dto/query-param.dto";

@Controller("pickupmtaani-agents")
export class PickupmtaaniAgentsController {
  constructor(
    private readonly pickupmtaaniAgentsService: PickupmtaaniAgentsService,
  ) {}
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPickupmtaaniAgentDto: any) {
    return this.pickupmtaaniAgentsService.create(createPickupmtaaniAgentDto);
  }

  @Get()
  findAll(@Query() queryParams: QueryParamDto) {
    return this.pickupmtaaniAgentsService.findAll(+queryParams.locationId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.pickupmtaaniAgentsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePickupmtaaniAgentDto: any,
  ) {
    return this.pickupmtaaniAgentsService.update(
      +id,
      updatePickupmtaaniAgentDto,
    );
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.pickupmtaaniAgentsService.remove(+id);
  }
}
