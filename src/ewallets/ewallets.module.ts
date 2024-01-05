import { Module } from '@nestjs/common';
import { EwalletsService } from './ewallets.service';
import { EwalletsController } from './ewallets.controller';

@Module({
  controllers: [EwalletsController],
  providers: [EwalletsService],
})
export class EwalletsModule {}
