import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RequestContextHolder } from '../../shared/context/request-context-holder';
import { FrontendException } from '../../shared/exceptions/frontend.exception';
import {
  DEFAULT_TIMEZONE,
  RequestContext,
} from '../../shared/constants/request-context.interface';
import { AppClient } from '../../shared/constants/app-client.enum';

@Injectable()
export class AppRequestContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.path.includes('/api/v1/attachment')) {
      next();
      return;
    }

    try {
      const clientHeader = req.headers['x-app-client'] as string | undefined;
      if (!clientHeader || clientHeader.toUpperCase() !== 'WEB') {
        throw new FrontendException('/', 403, 'unauthorizedClient');
      }

      const langHeader = (req.headers['accept-language'] as string) || 'en';
      const timezoneHeader = req.headers['x-timezone'] as string | undefined;
      const timezone = this.parseTimezone(timezoneHeader);

      const context: RequestContext = {
        client: AppClient.WEB,
        lang: langHeader,
        timezone: timezone,
        req: req,
      };

      RequestContextHolder.runWithContext(context, () => {
        next();
      });
    } catch (error) {
      next(error);
    }
  }

  private parseTimezone(timezoneHeader: string | undefined): string {
    if (!timezoneHeader || timezoneHeader.trim() === '') {
      return DEFAULT_TIMEZONE;
    }

    try {
      Intl.DateTimeFormat(undefined, { timeZone: timezoneHeader.trim() });
      return timezoneHeader.trim();
    } catch {
      return DEFAULT_TIMEZONE;
    }
  }
}
