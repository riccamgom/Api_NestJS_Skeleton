import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { MongooseModule } from '@nestjs/mongoose';
//All the models of the database
import { User, UserSchema } from '../user/schema/user.schema';
import {
  RateLimiter,
  RateLimiterSchema,
} from '../ratelimiter/schema/ratelimiter.schema';
import { Customer, CustomerSchema } from '../customer/schema/customer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: RateLimiter.name, schema: RateLimiterSchema },
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  providers: [SeederService],
  controllers: [SeederController],
})
export class SeederModule {}
