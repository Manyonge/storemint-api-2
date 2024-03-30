import { PickType } from "@nestjs/mapped-types";
import { PickupmtaaniAgent } from "../entities/pickupmtaani-agent.entity";

export class CreatePickupmtaaniAgentDto extends PickType(PickupmtaaniAgent, [
  "agent",
  "locationId",
] as const) {}
