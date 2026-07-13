import { CommonUtils } from './common.util';

export class RequestUtils {
  private static readonly DEFAULT_TIME_ZONE_OFFSET = 3 * 60;
  private static readonly DEFAULT_LANG = 'ar';
  private static readonly languages = new Set(['ar', 'en']);

  static getLang(): string {
    const req = CommonUtils.getCurrentRequest();
    const header = req?.headers?.['accept-language'];
    const value = Array.isArray(header) ? header[0] : header;
    const lang = value?.toLowerCase() || this.DEFAULT_LANG;
    return this.languages.has(lang) ? lang : this.DEFAULT_LANG;
  }

  static getAppClient(): string {
    const req = CommonUtils.getCurrentRequest();
    const header = req?.headers?.['x-app-client'];
    const value = Array.isArray(header) ? header[0] : header;
    return value || '';
  }

  static getTimeZoneOffset(): number {
    const req = CommonUtils.getCurrentRequest();
    const header = req?.headers?.['time-zone-offset'];
    const value = Array.isArray(header) ? header[0] : header;
    return value ? parseInt(value, 10) : this.DEFAULT_TIME_ZONE_OFFSET;
  }
}
