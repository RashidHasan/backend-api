import { Injectable } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

@Injectable()
export class CorsConfig {
  static getCorsOptions(): CorsOptions {
    return {
      origin: '*',
      methods: '*',
      allowedHeaders: '*',
      credentials: true,
    };
  }
}
