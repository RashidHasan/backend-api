import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  public readonly redirectUrl?: string | null;

  constructor(
    redirectUrl: string | null = null,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
    message: string = '',
  ) {
    super(message, status);
    this.redirectUrl = redirectUrl;
  }
}
