import { Body, Controller, Get, Post } from '@nestjs/common';
import { RatelimiterService } from './ratelimiter.service';
import { RateDto } from './dto/rate.dto';

@Controller('ratelimiter')
export class RatelimiterController {
  constructor(private ratelimiterService: RatelimiterService) {}

  @Get('routesweight')
  getRoutesWeight() {
    return this.ratelimiterService.findAll();
  }

  @Post('addrouteweight')
  addRouteWeight(@Body() body: RateDto) {
    return this.ratelimiterService.addRouteWeight(body);
  }
}
