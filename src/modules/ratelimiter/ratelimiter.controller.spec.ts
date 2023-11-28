import { Test, TestingModule } from '@nestjs/testing';
import { RatelimiterController } from './ratelimiter.controller';

describe('RatelimiterController', () => {
  let controller: RatelimiterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RatelimiterController],
    }).compile();

    controller = module.get<RatelimiterController>(RatelimiterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
