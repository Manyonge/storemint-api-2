import { Test, TestingModule } from '@nestjs/testing';
import { PickupmtaaniAgentsController } from './pickupmtaani-agents.controller';
import { PickupmtaaniAgentsService } from './pickupmtaani-agents.service';

describe('PickupmtaaniAgentsController', () => {
  let controller: PickupmtaaniAgentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PickupmtaaniAgentsController],
      providers: [PickupmtaaniAgentsService],
    }).compile();

    controller = module.get<PickupmtaaniAgentsController>(PickupmtaaniAgentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
