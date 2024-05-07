import { Module } from '@nestjs/common';
import { PumService } from './pum.service';
import { PumController } from './pum.controller';

@Module({
  controllers: [PumController],
  providers: [PumService],
})
export class PumModule {}
