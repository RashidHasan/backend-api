import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomException } from '../custom.exception';
import { ErrorModel } from '../error-model.exception';
import { FrontendException } from '../frontend.exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const lang = String(request.headers['accept-language'] || 'en');

    if (exception instanceof CustomException) {
      const errorModel = new ErrorModel(
        this.translate(exception.message, lang),
        exception.redirectUrl,
      );
      return response.status(exception.getStatus()).json(errorModel);
    }

    if (exception instanceof FrontendException) {
      const errorModel = new ErrorModel(
        this.translate(exception.message, lang),
        exception.redirectUrl,
        exception.message,
      );
      return response.status(exception.getStatus()).json(errorModel);
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (status === HttpStatus.UNAUTHORIZED.valueOf()) {
        const errorModel = new ErrorModel(
          this.translate('authError', lang),
          '/',
        );
        return response.status(HttpStatus.BAD_REQUEST).json(errorModel);
      }

      return response.status(status).json(exceptionResponse);
    }

    console.error(exception);

    const errorModel = new ErrorModel(this.translate('error500', lang));
    return response.status(HttpStatus.BAD_REQUEST).json(errorModel);
  }

  private translate(key: string, lang: string): string {
    void lang;
    return key;
  }
}
