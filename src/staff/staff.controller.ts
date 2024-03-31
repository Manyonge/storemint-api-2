import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import { StaffService } from "./staff.service";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { CheckIdParamPipe } from "../pipes/check-id-param-pipe.service";
import { QueryParamDto } from "./dto/QueryParam.dto";

@Controller("staff")
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @Get()
  findAll(@Query() queryParamDto: QueryParamDto) {
    return this.staffService.findAll(+queryParamDto.retailerId);
  }

  @Get(":id")
  findOne(@Param("id", new CheckIdParamPipe()) id: string) {
    return this.staffService.findOne(+id);
  }

  @Delete(":id")
  remove(@Param("id", new CheckIdParamPipe()) id: string) {
    return this.staffService.remove(+id);
  }
}
