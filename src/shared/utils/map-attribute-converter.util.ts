import { JsonUtils } from './json.util';

export class MapAttributeConverter {
  static convertToDatabaseColumn(
    attribute: Record<string, any> | null,
  ): string {
    return JsonUtils.writeValueAsString(attribute || {});
  }

  static convertToEntityAttribute(dbData: string | null): Record<string, any> {
    return JsonUtils.readValue<Record<string, any>>(dbData || '{}');
  }
}
