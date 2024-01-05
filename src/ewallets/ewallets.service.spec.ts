import { Test, TestingModule } from '@nestjs/testing';
import { EwalletsService } from './ewallets.service';

describe('EwalletsService', () => {
  let service: EwalletsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EwalletsService],
    }).compile();

    service = module.get<EwalletsService>(EwalletsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
