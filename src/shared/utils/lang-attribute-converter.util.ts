import { JsonUtils } from './json.util';
import { LangAttribute } from '../../domain/value-objects/lang-attribute.value-object';

export class LangAttributeConverter {
  static convertToDatabaseColumn(attribute: LangAttribute | null): string {
    return JsonUtils.writeValueAsString(attribute || new LangAttribute());
  }

  static convertToEntityAttribute(dbData: string | null): LangAttribute {
    const parsed = JsonUtils.readValue<Partial<LangAttribute>>(dbData || '{}');
    return new LangAttribute(parsed);
  }
}
