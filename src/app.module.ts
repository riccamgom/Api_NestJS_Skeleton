import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { CustomerModule } from './modules/customer/customer.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://ricardo:testpass@mongo:27017/'),
    UserModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
