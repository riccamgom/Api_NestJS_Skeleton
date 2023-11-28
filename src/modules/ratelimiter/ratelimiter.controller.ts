import { Controller, Get } from '@nestjs/common';
import { RatelimiterService } from './ratelimiter.service';

@Controller('ratelimiter')
export class RatelimiterController {
  constructor(private ratelimiterService: RatelimiterService) {}

  @Get('profile')
  getprofile() {
    return this.ratelimiterService.findAll();
  }
}
