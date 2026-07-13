import { Request } from 'express';
import { AppClient } from './app-client.enum';

export interface RequestContext {
  client: AppClient;
  lang: string;
  timezone: string;
  req?: Request;
}

export const DEFAULT_TIMEZONE = 'UTC';
