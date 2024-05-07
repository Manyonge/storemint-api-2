import { Test, TestingModule } from '@nestjs/testing';
import { PumController } from './pum.controller';
import { PumService } from './pum.service';

describe('PumController', () => {
  let controller: PumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PumController],
      providers: [PumService],
    }).compile();

    controller = module.get<PumController>(PumController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
