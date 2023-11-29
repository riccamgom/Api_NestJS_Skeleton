import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IpCount, RateLimiter, TokenCount } from './schema/ratelimiter.schema';
import { RateDto } from './dto/rate.dto';

@Injectable()
export class RatelimiterService {
  constructor(
    @InjectModel(RateLimiter.name) private ratelimiterModel: Model<RateLimiter>,
    @InjectModel(IpCount.name) private ipCountModel: Model<IpCount>,
    @InjectModel(TokenCount.name) private tokenCountModel: Model<TokenCount>,
  ) {}

  async findAll() {
    return this.ratelimiterModel.find().exec();
  }

  async addRouteWeight(routeWeight: RateDto): Promise<RateLimiter> {
    const createdLimit = new this.ratelimiterModel(routeWeight);
    return createdLimit.save();
  }

  async getRouteWeight(route: string) {
    const routeObj = await this.ratelimiterModel.findOne({ route });
    if (routeObj) {
      return routeObj.weight;
    }
  }

  async addIpCount(ip: string, weight: number) {
    if (!ip || weight <= 0) {
      throw new Error('Invalid IP or weight');
    }

    const timeAgo = new Date(Date.now() - 60000); // 1 minute ago (60000ms)
    try {
      const updatedIpCount = await this.ipCountModel.findOneAndUpdate(
        { ip },
        [
          {
            $set: {
              count: {
                $cond: [
                  { $gt: ['$updatedAt', timeAgo] },
                  { $add: ['$count', weight] },
                  weight,
                ],
              },
              updatedAt: new Date(),
            },
          },
        ],
        { new: true, upsert: true },
      );

      return updatedIpCount.count;
    } catch (error) {
      console.error('IpCount Error:', error);
      throw error;
    }
  }

  async addTokenCount(token: string, weight: number) {
    if (!token || weight <= 0) {
      throw new Error('Invalid token or weight');
    }

    const timeAgo = new Date(Date.now() - 120000); // 2 minutes ago (120000ms)
    try {
      const updatedTokenCount = await this.tokenCountModel.findOneAndUpdate(
        { token },
        [
          {
            $set: {
              count: {
                $cond: [
                  { $gt: ['$updatedAt', timeAgo] },
                  { $add: ['$count', weight] },
                  weight,
                ],
              },
              updatedAt: new Date(),
            },
          },
        ],
        { new: true, upsert: true },
      );

      return updatedTokenCount.count;
    } catch (error) {
      console.error('TokenCount Error:', error);
      throw error;
    }
  }
}
