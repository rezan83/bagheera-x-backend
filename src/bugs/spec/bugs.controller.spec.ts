import { Test, TestingModule } from '@nestjs/testing';
import { BugsController } from '../bug.controller';

describe('BugsController', () => {
  let controller: BugsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BugsController],
    }).compile();

    controller = module.get<BugsController>(BugsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
