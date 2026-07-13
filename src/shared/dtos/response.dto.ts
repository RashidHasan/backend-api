import { ResponseType } from '../constants/response-type.enum';

export class Response<T> {
  constructor(
    public success: boolean = false,
    public data?: T | null,
    public message?: string | null,
    public type: ResponseType = ResponseType.SUCCESS,
  ) {}

  static success<T>(data: T, message?: string | null): Response<T> {
    return new Response(true, data, message, ResponseType.SUCCESS);
  }

  static info(message: string): Response<any> {
    return new Response(true, null, message, ResponseType.INFO);
  }

  static warning(message: string): Response<any> {
    return new Response(true, null, message, ResponseType.WARNING);
  }

  static error(message: string): Response<any> {
    return new Response(false, null, message, ResponseType.ERROR);
  }
}
