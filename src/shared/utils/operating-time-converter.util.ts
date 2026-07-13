import { JsonUtils } from './json.util';
import { OperatingTimeAttribute } from '../../domain/value-objects/operating-time.value-object';

export class OperatingTimeAttributeConverter {
  static convertToDatabaseColumn(
    attribute: OperatingTimeAttribute | null,
  ): string {
    return JsonUtils.writeValueAsString(
      attribute || new OperatingTimeAttribute({ items: [] }),
    );
  }

  static convertToEntityAttribute(
    dbData: string | null,
  ): OperatingTimeAttribute {
    const parsed = JsonUtils.readValue<Partial<OperatingTimeAttribute>>(
      dbData || '{}',
    );
    return new OperatingTimeAttribute(parsed);
  }
}
