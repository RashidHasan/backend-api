export class JsonUtils {
  static writeValueAsString(obj: any): string {
    try {
      return JSON.stringify(obj);
    } catch {
      return '';
    }
  }

  static fromObject<T>(obj: any): T {
    return this.readValue<T>(this.writeValueAsString(obj));
  }

  static readValue<T>(str: string): T {
    try {
      return JSON.parse(str) as T;
    } catch {
      return {} as T;
    }
  }
}
