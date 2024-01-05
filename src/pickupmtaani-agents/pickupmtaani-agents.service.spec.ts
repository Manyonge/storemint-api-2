import { Test, TestingModule } from '@nestjs/testing';
import { PickupmtaaniAgentsService } from './pickupmtaani-agents.service';

describe('PickupmtaaniAgentsService', () => {
  let service: PickupmtaaniAgentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PickupmtaaniAgentsService],
    }).compile();

    service = module.get<PickupmtaaniAgentsService>(PickupmtaaniAgentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
