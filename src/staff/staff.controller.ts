import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { StaffService } from "./staff.service";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";
import { CheckIdParamPipe } from "../pipes/check-id-param-pipe.service";

@Controller("staff")
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @Get()
  findAll() {
    return this.staffService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", new CheckIdParamPipe()) id: string) {
    return this.staffService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id", new CheckIdParamPipe()) id: string,
    @Body() updateStaffDto: UpdateStaffDto,
  ) {
    return this.staffService.update(+id, updateStaffDto);
  }

  @Delete(":id")
  remove(@Param("id", new CheckIdParamPipe()) id: string) {
    return this.staffService.remove(+id);
  }
}
