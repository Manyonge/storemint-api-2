import { Injectable } from "@nestjs/common";
import { CreatePickupmtaaniAgentDto } from "./dto/create-pickupmtaani-agent.dto";
import { UpdatePickupmtaaniAgentDto } from "./dto/update-pickupmtaani-agent.dto";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class PickupmtaaniAgentsService {
  constructor(private prisma: PrismaService) {}
  async create(createPickupmtaaniAgentDto: CreatePickupmtaaniAgentDto) {
    return await this.prisma.pickupmtaaniAgent.create({
      data: createPickupmtaaniAgentDto,
    });
  }

  async findAll(locationId: number) {
    return await this.prisma.pickupmtaaniAgent.findMany({
      where: {
        locationId,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.pickupmtaaniAgent.findUnique({ where: { id } });
  }

  async update(
    id: number,
    updatePickupmtaaniAgentDto: UpdatePickupmtaaniAgentDto,
  ) {
    return await this.prisma.pickupmtaaniAgent.update({
      where: { id },
      data: updatePickupmtaaniAgentDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.pickupmtaaniAgent.delete({ where: { id } });
  }
}
