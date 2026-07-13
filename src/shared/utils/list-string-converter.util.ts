import { JsonUtils } from './json.util';

export class ListStringConverter {
  static convertToDatabaseColumn(attribute: string[] | null): string {
    return JsonUtils.writeValueAsString(attribute || []);
  }

  static convertToEntityAttribute(dbData: string | null): string[] {
    if (!dbData || dbData.trim() === '') return [];
    try {
      return JsonUtils.readValue<string[]>(dbData);
    } catch {
      return [];
    }
  }
}
