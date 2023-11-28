import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class RateLimiter extends Document {
  @Prop()
  ip: string;

  @Prop({ required: true })
  route: string;

  @Prop()
  count: number;
}

export const RateLimiterSchema = SchemaFactory.createForClass(RateLimiter);
