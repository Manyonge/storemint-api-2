import { BadRequestException, Injectable } from "@nestjs/common";
import { QueryParamDto } from "./dto/query-param.dto";
import * as dotenv from "dotenv";
import axios from "axios";
import { CreateAgentPackageDto } from "./dto/create-agent-package.dto";

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

  async findLocationAgents(id: number) {
    try {
      const { data } = await axios.get(`${process.env.PUM_BASE_URL}/agents`);
      let filteredAgents = [];
      const agents = data?.agents;
      if (Array.isArray(agents) && agents.length > 0) {
        filteredAgents = agents.filter((agent) => agent.location_id_id === id);
      }
      return filteredAgents;
    } catch (e) {
      console.log(e);
      throw new BadRequestException("operation failed");
    }
  }

  async createAgentPackage(createAgentPackage: CreateAgentPackageDto) {
    try {
      const response = await axios.get(
        `${process.env.PUM_BASE_URL}/package/delivery-charge?senderAgentID=${createAgentPackage.senderAgentID_id}&receiverAgentID=${createAgentPackage.receieverAgentID_id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.PUM_TOKEN}`,
          },
        },
      );
      const delivery_fee = response.data.price;
      console.log({ deliveryFee: delivery_fee });
      const packageResponse = await axios.post(
        `${process.env.PUM_BASE_URL}/package`,
        {
          payment_phone_number: "+254792586134",
          delivery_type: "agent",
          packages: [
            {
              customerName: createAgentPackage.customerName,
              customerPhoneNumber: createAgentPackage.customerPhoneNumber,
              senderAgentID_id: createAgentPackage.senderAgentID_id,
              receieverAgentID_id: createAgentPackage.receieverAgentID_id,
              fromLocation: createAgentPackage.fromLocation,
              toLocation: createAgentPackage.toLocation,
              product_id: null,
              packageName: createAgentPackage.packageName,
              package_value: createAgentPackage.package_value,
              total_fee: createAgentPackage.total_fee,
              delivery_fee,
              businessId_id: 390,
              payment_phone_number: "+254792586134",
              products: [],
              color: createAgentPackage.color,
              p_id: "",
              payment_option: "vendor",
              on_delivery_balance: createAgentPackage.on_delivery_balance,
              shift: createAgentPackage.shift,
              pipe: "",
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.PUM_TOKEN}`,
          },
        },
      );
      return packageResponse.data;
    } catch (e) {
      console.log(e);
      throw new BadRequestException("operation failed");
    }
  }
}
