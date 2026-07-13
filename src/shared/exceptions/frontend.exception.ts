import { HttpException, HttpStatus } from '@nestjs/common';

export class FrontendException extends HttpException {
  public readonly redirectUrl?: string | null;

  constructor(
    redirectUrl: string | null = null,
    status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    messageCode: string = '',
  ) {
    super(messageCode, status);
    this.redirectUrl = redirectUrl;
  }
}
