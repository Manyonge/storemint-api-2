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
import { StaffService } from "./staff.service";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { CheckIdParamPipe } from "../pipes/check-id-param-pipe.service";
import { QueryParamDto } from "./dto/QueryParam.dto";
import { AuthGuard } from "../auth/auth.guard";

@Controller("staff")
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Query() queryParamDto: QueryParamDto) {
    return this.staffService.findAll(+queryParamDto.retailerId);
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  findOne(@Param("id", new CheckIdParamPipe()) id: string) {
    return this.staffService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  remove(@Param("id", new CheckIdParamPipe()) id: string) {
    return this.staffService.remove(+id);
  }
}
