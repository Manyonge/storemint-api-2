import { Test, TestingModule } from '@nestjs/testing';
import { EwalletsController } from './ewallets.controller';
import { EwalletsService } from './ewallets.service';

describe('EwalletsController', () => {
  let controller: EwalletsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EwalletsController],
      providers: [EwalletsService],
    }).compile();

    controller = module.get<EwalletsController>(EwalletsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
