import { validate as isUUID } from 'uuid';

export class ConverterUtils {
  static convertToUUID(obj: any): string | null {
    if (typeof obj === 'string' && isUUID(obj)) {
      return obj;
    }
    return null;
  }
}
