import { Body, Controller, Delete, Get, Param, Patch } from "@nestjs/common";
import { EwalletsService } from "./ewallets.service";
import { UpdateEwalletDto } from "./dto/update-ewallet.dto";

@Controller("api/ewallets")
export class EwalletsController {
  constructor(private readonly ewalletsService: EwalletsService) {}

  @Get()
  findAll() {
    return this.ewalletsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.ewalletsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateEwalletDto: UpdateEwalletDto) {
    return this.ewalletsService.update(+id, updateEwalletDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.ewalletsService.remove(+id);
  }
}
