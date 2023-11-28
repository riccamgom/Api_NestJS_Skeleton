import { Global, Module } from '@nestjs/common';
import { RatelimiterService } from './ratelimiter.service';
import { RatelimiterController } from './ratelimiter.controller';
//MongoDB
import { MongooseModule } from '@nestjs/mongoose';
import { RateLimiter, RateLimiterSchema } from './schema/ratelimiter.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RateLimiter.name, schema: RateLimiterSchema },
    ]),
  ],
  providers: [RatelimiterService],
  controllers: [RatelimiterController],
  exports: [RatelimiterService],
})
export class RatelimiterModule {}
