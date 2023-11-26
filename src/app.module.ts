import { Module } from '@nestjs/common';
//Use config module to load environment variables
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'src/common/config/configuration';
//MongoDB
import { MongooseModule } from '@nestjs/mongoose';
//Modules
import { UserModule } from './modules/user/user.module';
import { CustomerModule } from './modules/customer/customer.module';
//Auth and Security
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
//import { AuthModule } from './auth/auth.module';
// Default files
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //Config module is available everywhere
      cache: true,
      load: [configuration],
      envFilePath: ['.env.local', '.env.docker'], //If it doesn't find the .env.local file, it will use the .env.docker
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('database.url'),
      }),
    }),
    UserModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD, //This applies GUARD to all the routes (except public decorated)
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
