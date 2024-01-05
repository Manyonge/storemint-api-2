import { Test, TestingModule } from '@nestjs/testing';
import { PickupmtaaniLocationsService } from './pickupmtaani-locations.service';

describe('PickupmtaaniLocationsService', () => {
  let service: PickupmtaaniLocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PickupmtaaniLocationsService],
    }).compile();

    service = module.get<PickupmtaaniLocationsService>(PickupmtaaniLocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
