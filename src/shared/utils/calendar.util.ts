import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export interface Interval {
  start: dayjs.Dayjs;
  end: dayjs.Dayjs;
}

export class CalendarUtils {
  private static readonly localZoneId = 'Asia/Riyadh';

  static now(atStart: boolean = false, local: boolean = false): dayjs.Dayjs {
    const result = local ? dayjs().tz(this.localZoneId) : dayjs().utc();
    if (atStart) return this.atStartOfDay(result)!;
    return result;
  }

  static toOffset(hours: number): string {
    const sign = hours >= 0 ? '+' : '-';
    const absHours = Math.abs(hours).toString().padStart(2, '0');
    return `${sign}${absHours}:00`;
  }

  static toOffsetFromDate(localDate: Date | null): dayjs.Dayjs | null {
    if (!localDate) return null;
    return dayjs(localDate).utc().startOf('day');
  }

  static atStartOfDay(offsetDateTime: dayjs.Dayjs | null): dayjs.Dayjs | null {
    if (!offsetDateTime) return null;
    return offsetDateTime.tz(this.localZoneId).startOf('day');
  }

  static atEndOfDay(offsetDateTime: dayjs.Dayjs | null): dayjs.Dayjs | null {
    if (!offsetDateTime) return null;
    return offsetDateTime.tz(this.localZoneId).endOf('day');
  }

  static firstDayOfYear(year: number): dayjs.Dayjs {
    return dayjs()
      .year(year)
      .month(0)
      .date(1)
      .tz(this.localZoneId)
      .startOf('day');
  }

  static lastDayOfYear(year: number): dayjs.Dayjs {
    return this.firstDayOfYear(year + 1).subtract(1, 'millisecond');
  }

  static schedule(
    start: dayjs.Dayjs,
    end: dayjs.Dayjs,
    daysOfWeek: number[],
    startingHour: number,
    durationMinutes: number,
  ): Interval[] {
    const result: Interval[] = [];
    let current = start;

    while (current.isBefore(end)) {
      if (daysOfWeek.includes(current.day())) {
        const eventStart = current
          .hour(startingHour)
          .minute(0)
          .second(0)
          .millisecond(0);
        const eventEnd = eventStart.add(durationMinutes, 'minute');

        if (!eventEnd.isAfter(end)) {
          result.push({
            start: eventStart.tz(this.localZoneId),
            end: eventEnd.tz(this.localZoneId),
          });
        }
      }
      current = current.add(1, 'day');
    }
    return result;
  }

  static toIsoFormat(offsetDateTime: dayjs.Dayjs): string {
    return offsetDateTime.toISOString();
  }

  static toOffsetDateTime(isoString: string | null): dayjs.Dayjs | null {
    if (!isoString) return null;
    try {
      return dayjs(isoString);
    } catch {
      return null;
    }
  }

  static formatToDate(datetime: dayjs.Dayjs | null): string | null {
    if (!datetime) return null;
    try {
      return datetime.format('YYYY-MM-DD');
    } catch {
      return null;
    }
  }

  static formatDate(input: number | null): string {
    if (!input) return '';
    const date = dayjs(input.toString(), 'YYYYMMDD');
    return date.format('YYYY-MM-DD');
  }

  static dayIdToLocalDate(input: number | null): Date | null {
    if (!input) return null;
    return dayjs(input.toString(), 'YYYYMMDD').toDate();
  }

  static dayIdToOffsetDateTime(input: number | null): dayjs.Dayjs | null {
    if (!input) return null;
    return dayjs(input.toString(), 'YYYYMMDD').utc().startOf('day');
  }

  static dayIdToUTC(input: number | null): dayjs.Dayjs | null {
    if (!input) return null;
    return dayjs(input.toString(), 'YYYYMMDD').utc().startOf('day');
  }

  static dayToLocalDate(day: string): Date | null {
    return dayjs(day, 'YYYY-MM-DD').toDate();
  }

  static formatToTime(datetime: dayjs.Dayjs | null): string | null {
    if (!datetime) return null;
    try {
      return datetime.format('HH:mm');
    } catch {
      return null;
    }
  }

  static formatToDateTime(datetime: dayjs.Dayjs | null): string | null {
    if (!datetime) return null;
    try {
      return datetime.format('YYYY-MM-DD hh:mm');
    } catch {
      return null;
    }
  }

  static getDayAsInt(): number {
    return parseInt(dayjs().tz(this.localZoneId).format('YYYYMMDD'), 10);
  }
}
