import { Module } from '@nestjs/common';
import { PickupmtaaniLocationsService } from './pickupmtaani-locations.service';
import { PickupmtaaniLocationsController } from './pickupmtaani-locations.controller';

@Module({
  controllers: [PickupmtaaniLocationsController],
  providers: [PickupmtaaniLocationsService],
})
export class PickupmtaaniLocationsModule {}
