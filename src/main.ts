import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsConfig } from './config/cors.config';
import { setupScalar } from './docs/scalar.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(CorsConfig.getCorsOptions());
  setupScalar(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
