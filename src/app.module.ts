import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_GUARD, APP_FILTER } from '@nestjs/core';
import { AppController } from './presentation/controllers/app.controller';
import { AppService } from './application/services/app.service';
import { TranslationService } from './application/services/translation.service';
import { AppRequestContextMiddleware } from './infrastructure/middleware/app-request-context.middleware';
import { ResponseTranslationInterceptor } from './infrastructure/interceptors/response-translation.interceptor';
import { AuthGuard } from './infrastructure/guards/auth.guard';
import { UnauthorizedExceptionFilter } from './infrastructure/filters/unauthorized.filter';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    TranslationService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: UnauthorizedExceptionFilter,
    },
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
