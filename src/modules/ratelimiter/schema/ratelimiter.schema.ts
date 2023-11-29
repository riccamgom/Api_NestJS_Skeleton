import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

//Rate limiter for routes
@Schema()
export class RateLimiter extends Document {
  @Prop({ required: true })
  route: string;

  @Prop()
  weight: number;
}

export const RateLimiterSchema = SchemaFactory.createForClass(RateLimiter);

//Rate limiter for ip addresses
@Schema({ timestamps: true })
export class IpCount extends Document {
  @Prop({ required: true })
  ip: string;

  @Prop()
  count: number;
}

export const IpCountSchema = SchemaFactory.createForClass(IpCount);

//Rate limiter for tokens (JWT)
@Schema({ timestamps: true })
export class TokenCount extends Document {
  @Prop({ required: true })
  token: string;

  @Prop()
  count: number;
}

export const TokenCountSchema = SchemaFactory.createForClass(TokenCount);
