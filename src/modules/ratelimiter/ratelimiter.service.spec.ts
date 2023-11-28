import { Test, TestingModule } from '@nestjs/testing';
import { RatelimiterService } from './ratelimiter.service';

describe('RatelimiterService', () => {
  let service: RatelimiterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RatelimiterService],
    }).compile();

    service = module.get<RatelimiterService>(RatelimiterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
