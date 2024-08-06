import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IndexModule } from './index/index.module';
import { StoreModule } from './store/store.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '60s' },
    }),
    IndexModule, StoreModule, UserModule, OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: '', method: RequestMethod.GET },
        // { path: 'yourPath', method: RequestMethod.POST },
        // 'yourPath/(.*)',
      )
      .forRoutes('*');

    consumer.apply(LoggerMiddleware).forRoutes('store');
    consumer.apply(LoggerMiddleware).forRoutes('user');
  }
}
