import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { RetailersService } from "./retailers.service";
import { UpdateRetailerDto } from "./dto/update-retailer.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { Express, Request } from "express";
import { CreateRetailerDto } from "./dto/create-retailer.dto";
import { AuthGuard } from "../auth/auth.guard";

@Controller("api/retailers")
export class RetailersController {
  constructor(private readonly retailersService: RetailersService) {}
  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: "businessLogo",
        maxCount: 1,
      },
      {
        name: "passportPhoto",
        maxCount: 1,
      },
    ]),
  )
  create(
    @Body() createRetailerDto: CreateRetailerDto,
    @UploadedFiles()
    files: {
      businessLogo?: Express.Multer.File[];
      passportPhoto?: Express.Multer.File[];
    },
  ) {
    return this.retailersService.signUpWithEmail(createRetailerDto, files);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.retailersService.findAll(req);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.retailersService.findById(+id);
  }
  @UseGuards(AuthGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateRetailerDto: UpdateRetailerDto,
  ) {
    return this.retailersService.update(+id, updateRetailerDto);
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.retailersService.remove(+id);
  }
}
