import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { PickupmtaaniLocationsService } from "./pickupmtaani-locations.service";
import { AuthGuard } from "../auth/auth.guard";

@Controller("pickupmtaani-locations")
export class PickupmtaaniLocationsController {
  constructor(
    private readonly pickupmtaaniLocationsService: PickupmtaaniLocationsService,
  ) {}
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPickupmtaaniLocationDto: any) {
    return this.pickupmtaaniLocationsService.create(
      createPickupmtaaniLocationDto,
    );
  }

  @Get()
  findAll() {
    return this.pickupmtaaniLocationsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.pickupmtaaniLocationsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePickupmtaaniLocationDto: any,
  ) {
    return this.pickupmtaaniLocationsService.update(
      +id,
      updatePickupmtaaniLocationDto,
    );
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.pickupmtaaniLocationsService.remove(+id);
  }
}
