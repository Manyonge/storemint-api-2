import { PartialType } from '@nestjs/mapped-types';
import { CreateRetailerDto } from './create-retailer.dto';
import { Retailer } from "../entities/retailer.entity";

export class UpdateRetailerDto extends PartialType(Retailer) {}
