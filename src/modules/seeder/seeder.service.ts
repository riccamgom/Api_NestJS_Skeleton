import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//All the models of the database
import { User } from '../user/schema/user.schema';
import { RateLimiter } from '../ratelimiter/schema/ratelimiter.schema';
import { Customer } from '../customer/schema/customer.schema';
//Seeder
import { customers, users, rateLimiters } from './seedData/seedData';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(RateLimiter.name) private rateLimiterModel: Model<RateLimiter>,
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  async seedData() {
    await this.userModel.deleteMany({});
    await this.rateLimiterModel.deleteMany({});
    await this.customerModel.deleteMany({});

    await this.customerModel.insertMany(customers);
    await this.rateLimiterModel.insertMany(rateLimiters);
    await this.userModel.insertMany(users);

    return 'Data seeded successfully!';
  }
}
