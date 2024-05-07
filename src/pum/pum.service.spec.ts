import { Test, TestingModule } from '@nestjs/testing';
import { PumService } from './pum.service';

describe('PumService', () => {
  let service: PumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PumService],
    }).compile();

    service = module.get<PumService>(PumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
