import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslationService } from '../../application/services/translation.service';
import { RequestUtils } from '../../shared/utils/request.util';

@Injectable()
export class ResponseTranslationInterceptor implements NestInterceptor {
  constructor(private readonly translationService: TranslationService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const lang = RequestUtils.getLang();
        return this.translateData(data, lang);
      }),
    );
  }

  private translateData(data: any, lang: string): any {
    if (!data || typeof data !== 'object') {
      return data;
    }

    if (data.message && typeof data.message === 'string') {
      data.message = this.translationService.translate(data.message, lang);
    }

    this.translateDeep(data, lang);
    return data;
  }

  private translateDeep(obj: any, lang: string): void {
    if (!obj || typeof obj !== 'object') return;

    for (const key of Object.keys(obj)) {
      if (key === 'message') continue;

      const value = obj[key];

      if (typeof value === 'string') {
        if (this.translationService.hasKey(value, lang)) {
          obj[key] = this.translationService.translate(value, lang);
        }
      } else if (typeof value === 'object') {
        this.translateDeep(value, lang);
      }
    }
  }
}
