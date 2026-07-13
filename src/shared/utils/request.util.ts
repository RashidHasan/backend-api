import { RequestContextHolder } from '../context/request-context-holder';

export class RequestUtils {
  private static readonly DEFAULT_LANG = 'ar';
  private static readonly languages = new Set(['ar', 'en']);

  static getLang(): string {
    try {
      const context = RequestContextHolder.getContext();
      if (context?.lang) {
        const lang = context.lang.toLowerCase().split(',')[0].trim();
        return this.languages.has(lang) ? lang : this.DEFAULT_LANG;
      }
    } catch {}
    return this.DEFAULT_LANG;
  }

  static getAppClient(): string {
    try {
      const context = RequestContextHolder.getContext();
      return context?.client || '';
    } catch {
      return '';
    }
  }

  static getTimeZoneOffset(): number {
    try {
      const context = RequestContextHolder.getContext();
      if (context?.timezone) {
        const offset = this.parseTimezoneToOffset(context.timezone);
        return offset !== null ? offset : 180;
      }
    } catch {}
    return 180;
  }

  private static parseTimezoneToOffset(timezone: string): number | null {
    try {
      const date = new Date();
      const tzDate = new Date(
        date.toLocaleString('en-US', { timeZone: timezone }),
      );
      const utcDate = new Date(
        date.toLocaleString('en-US', { timeZone: 'UTC' }),
      );
      return (tzDate.getTime() - utcDate.getTime()) / (1000 * 60);
    } catch {
      return null;
    }
  }
}
