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

  async addRouteWeight(routeWeight: RateDto): Promise<RateLimiter> {
    const createdLimit = new this.ratelimiterModel(routeWeight);
    return createdLimit.save();
  }

  async findAll() {
    return this.ratelimiterModel.find().exec();
  }

  async getRouteWeight(route: string) {
    const routeObj = await this.ratelimiterModel.findOne({ route });
    if (routeObj) {
      return routeObj.weight;
    }
  }

  async addIpCount(ip: string, weight: number) {
    try {
      if (!ip || weight <= 0) {
        throw new Error('Invalid IP or weight');
      }
      const updatedIpCount = await this.ipCountModel.findOneAndUpdate(
        { ip },
        { $inc: { count: weight } },
        { new: true, upsert: true },
      );
      return updatedIpCount.count;
    } catch (error) {
      console.error('IpCount Error:', error);
      throw error;
    }
  }

  async addTokenCount(token: string, weight: number) {
    try {
      if (!token || weight <= 0) {
        throw new Error('Invalid token or weight');
      }
      const updatedTokenCount = await this.tokenCountModel.findOneAndUpdate(
        { token },
        { $inc: { count: weight } },
        { new: true, upsert: true },
      );
      return updatedTokenCount.count;
    } catch (error) {
      console.error('TokenCount Error:', error);
      throw error;
    }
  }
}
