import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { AuthGuard } from "../auth/auth.guard";
import { QueryParamDto } from "./dto/query-param.dto";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { UploadedFilesDto } from "./dto/uploaded-files.dto";
import { CreateImageParamDto } from "./dto/create-image-param.dto";
import { Request } from "express";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto);
  }

  @UseGuards(AuthGuard)
  @Post(":productId/product-images")
  @UseInterceptors(AnyFilesInterceptor())
  async uploadProductImage(
    @Query() queryParams: CreateImageParamDto,
    @UploadedFiles()
    file: UploadedFilesDto,
  ) {
    return this.productsService.createOneProductImage(
      +queryParams.productId,
      +queryParams.position,
      file,
    );
  }

  @Get()
  findAll(
    @Query(new ValidationPipe()) queryParams: QueryParamDto,
    @Req() req: Request,
  ) {
    return this.productsService.findAll(+queryParams.retailerId, req);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productsService.remove(+id);
  }

  @Get(":productId/product-images")
  findAllProductImages(@Param("productId") productId: string) {
    return this.productsService.findAllProductImages(+productId);
  }

  @Get(":productId/product-images/:imageId")
  findOneProductImage(@Param("imageId") imageId: string) {
    return this.productsService.findOneProductImage(+imageId);
  }

  @UseGuards(AuthGuard)
  @Delete(":productId/product-images/:imageId")
  deleteOneProductImage(@Param("imageId") imageId: string) {
    return this.productsService.deleteOneProductImage(+imageId);
  }
}
