import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';

export class PhoneUtils {
  static formatPhoneNumber(phoneNumber: string): string {
    const phoneUtil = PhoneNumberUtil.getInstance();
    try {
      const parsedNumber = phoneUtil.parse(phoneNumber, 'JO');
      return phoneUtil.format(parsedNumber, PhoneNumberFormat.E164);
    } catch {
      return '';
    }
  }
}
