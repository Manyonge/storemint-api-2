import { Test, TestingModule } from '@nestjs/testing';
import { PickupmtaaniLocationsController } from './pickupmtaani-locations.controller';
import { PickupmtaaniLocationsService } from './pickupmtaani-locations.service';

describe('PickupmtaaniLocationsController', () => {
  let controller: PickupmtaaniLocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PickupmtaaniLocationsController],
      providers: [PickupmtaaniLocationsService],
    }).compile();

    controller = module.get<PickupmtaaniLocationsController>(PickupmtaaniLocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
