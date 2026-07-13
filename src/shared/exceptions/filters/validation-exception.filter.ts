import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { BadRequestResponse } from '../bad-request-response.exception';

interface ValidationErrorMessage {
  property?: string;
  constraints?: Record<string, string>;
  children?: ValidationErrorMessage[];
}

interface BadRequestExceptionResponse {
  message?: ValidationErrorMessage[] | string;
  error?: string;
  statusCode?: number;
}

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const exceptionResponse =
      exception.getResponse() as BadRequestExceptionResponse;

    const customResponse = new BadRequestResponse();

    if (
      exceptionResponse?.message &&
      Array.isArray(exceptionResponse.message)
    ) {
      this.flattenErrors(exceptionResponse.message).forEach(
        (error: ValidationErrorMessage) => {
          if (error.constraints && error.property) {
            const firstConstraint = Object.values(error.constraints)[0];
            if (typeof firstConstraint === 'string') {
              customResponse.fields[error.property] = firstConstraint;
            }
          }
        },
      );
    }

    return response.status(HttpStatus.BAD_REQUEST).json(customResponse);
  }

  private flattenErrors(
    errors: ValidationErrorMessage[],
  ): ValidationErrorMessage[] {
    const result: ValidationErrorMessage[] = [];

    errors.forEach((error) => {
      result.push(error);
      if (error.children && error.children.length > 0) {
        result.push(...this.flattenErrors(error.children));
      }
    });

    return result;
  }
}
