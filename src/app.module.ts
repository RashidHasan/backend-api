// app.module.ts
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './presentation/controllers/app.controller';
import { AppService } from './application/services/app.service';
import { TranslationService } from './application/services/translation.service';
import { ResponseTranslationInterceptor } from './infrastructure/interceptors/response-translation.interceptor';
import { AppRequestContextMiddleware } from './infrastructure/middleware/app-request-context.middleware';
import { ProductService } from './application/services/product.service';
import { ProductController } from './presentation/controllers/product.controller';
import { databaseConfig } from './config/database.config';
import { Product } from './domain/entities/product.entity';
import { Cost } from './domain/entities/cost.entity';
import { CostService } from './application/services/cost.service';
import { CostController } from './presentation/controllers/cost.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'dev'}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: databaseConfig,
    }),
    TypeOrmModule.forFeature([Product, Cost]),
  ],
  controllers: [AppController, ProductController, CostController],
  providers: [
    AppService,
    TranslationService,
    ProductService,
    CostService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTranslationInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AppRequestContextMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
