import { Global, Module } from '@nestjs/common';
import { RatelimiterService } from './ratelimiter.service';
import { RatelimiterController } from './ratelimiter.controller';
//MongoDB
import { MongooseModule } from '@nestjs/mongoose';
import {
  IpCount,
  IpCountSchema,
  RateLimiter,
  RateLimiterSchema,
  TokenCount,
  TokenCountSchema,
} from './schema/ratelimiter.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RateLimiter.name, schema: RateLimiterSchema },
      { name: IpCount.name, schema: IpCountSchema },
      { name: TokenCount.name, schema: TokenCountSchema },
    ]),
  ],
  providers: [RatelimiterService],
  controllers: [RatelimiterController],
  exports: [RatelimiterService],
})
export class RatelimiterModule {}
