import { BadRequestException, Injectable } from "@nestjs/common";
import { QueryParamDto } from "./dto/query-param.dto";
import * as dotenv from "dotenv";
import axios from "axios";

dotenv.config();
@Injectable()
export class PumService {
  async findAllLocations(queryParams: QueryParamDto) {
    try {
      const response = await axios.get(
        `${process.env.PUM_BASE_URL}/agents-locations?region=${queryParams.region}`,
      );
      return response.data;
    } catch (e) {
      console.log(e);
      throw new BadRequestException("operation failed");
    }
  }

  findLocationAgents(id: number) {
    return `This action returns a #${id} pum`;
  }
}
