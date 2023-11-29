import { Test, TestingModule } from '@nestjs/testing';
import { RatelimiterController } from '../ratelimiter.controller';
import { RatelimiterService } from '../ratelimiter.service';
import { RateDto } from '../dto/rate.dto';

describe('RatelimiterController', () => {
  let controller: RatelimiterController;
  let service: RatelimiterService;

  beforeEach(async () => {
    const mockRatelimiterService = {
      findAll: jest.fn(),
      addRouteWeight: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RatelimiterController],
      providers: [
        {
          provide: RatelimiterService,
          useValue: mockRatelimiterService,
        },
      ],
    }).compile();

    controller = module.get<RatelimiterController>(RatelimiterController);
    service = module.get<RatelimiterService>(RatelimiterService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getRoutesWeight', () => {
    it('should call ratelimiterService.findAll', async () => {
      await controller.getRoutesWeight();
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('addRouteWeight', () => {
    it('should call ratelimiterService.addRouteWeight with RateDto', async () => {
      const rateDto: RateDto = {
        route: 'test',
        weight: 1,
      };
      await controller.addRouteWeight(rateDto);
      expect(service.addRouteWeight).toHaveBeenCalledWith(rateDto);
    });
  });
});
