import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SystemConfig {
  constructor(private configService: ConfigService) {}

  get baseFolder(): string | undefined {
    return this.configService.get<string>('BASE_FOLDER');
  }

  get backendDomain(): string | undefined {
    return this.configService.get<string>('BACKEND_DOMAIN');
  }

  get frontendDomain(): string | undefined {
    return this.configService.get<string>('FRONTEND_DOMAIN');
  }

  get tokenName(): string | undefined {
    return this.configService.get<string>('TOKEN_NAME');
  }

  get cookieDomain(): string | undefined {
    return this.configService.get<string>('COOKIE_DOMAIN');
  }

  get expiryTimeInDays(): number {
    return this.configService.get<number>('COOKIE_EXPIRY_TIME_IN_DAYS', 7);
  }

  get sessionPendingTimeoutMs(): number {
    return this.configService.get<number>('SESSION_PENDING_TIMEOUT_MS', 600000);
  }

  get emailFrom(): string | undefined {
    return this.configService.get<string>('EMAIL_FROM');
  }

  get mapsApiKey(): string | undefined {
    return this.configService.get<string>('MAPS_API_KEY');
  }

  get twilioSid(): string {
    return this.configService.get<string>('TWILIO_SID', '');
  }

  get twilioAuthToken(): string {
    return this.configService.get<string>('TWILIO_AUTH_TOKEN', '');
  }

  get appVersion(): string {
    return this.configService.get<string>('APP_VERSION', '1.0.0');
  }

  get quickKeyApiKey(): string | undefined {
    return this.configService.get<string>('QUICK_KEY_API_KEY');
  }

  get allowedFileTypes(): string {
    return this.configService.get<string>(
      'UPLOAD_ALLOWED_FILE_TYPES',
      '.jpg,.jpeg,.png',
    );
  }

  get maxFileSizeMb(): number {
    return this.configService.get<number>('UPLOAD_MAX_FILE_SIZE_MB', 10);
  }

  get maxRequestSizeMb(): number {
    return this.configService.get<number>('UPLOAD_MAX_REQUEST_SIZE_MB', 50);
  }

  get maxImagesPerContent(): number {
    return this.configService.get<number>('UPLOAD_MAX_IMAGES_PER_CONTENT', 10);
  }

  get maxImagesPerSection(): number {
    return this.configService.get<number>('UPLOAD_MAX_IMAGES_PER_SECTION', 10);
  }

  get recipientEmail(): string | undefined {
    return this.configService.get<string>('EMAIL_TO');
  }

  getAllowedFileTypesList(): string[] {
    return this.allowedFileTypes
      .split(',')
      .map((type) => type.trim().toLowerCase());
  }
}
