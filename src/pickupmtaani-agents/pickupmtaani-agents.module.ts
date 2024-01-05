import { Module } from '@nestjs/common';
import { PickupmtaaniAgentsService } from './pickupmtaani-agents.service';
import { PickupmtaaniAgentsController } from './pickupmtaani-agents.controller';

@Module({
  controllers: [PickupmtaaniAgentsController],
  providers: [PickupmtaaniAgentsService],
})
export class PickupmtaaniAgentsModule {}
