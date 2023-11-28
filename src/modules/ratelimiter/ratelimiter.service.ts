import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RateLimiter } from './schema/ratelimiter.schema';
import { RateDto } from './dto/rate.dto';

@Injectable()
export class RatelimiterService {
  constructor(
    @InjectModel(RateLimiter.name) private ratelimiterModel: Model<RateLimiter>,
  ) {}

  async addlimit(rateLimit: RateDto): Promise<RateLimiter> {
    const createdLimit = new this.ratelimiterModel(rateLimit);
    return createdLimit.save();
  }

  async findAll() {
    return this.ratelimiterModel.find().exec();
  }
}
