 import { LangAttribute } from '../../domain/value-objects/lang-attribute.value-object';
 import { RequestUtils } from './request.util';

export class LangUtils {
  static getLang(): string {
    return RequestUtils.getLang();
  }

  static isRTL(): boolean {
    return this.getLang() === 'ar';
  }

  static fillLangAttribute(
    value: string | null,
    langAttribute: LangAttribute = new LangAttribute(),
  ): LangAttribute {
    langAttribute.ar = value?.trim() || null;
    langAttribute.en = value?.trim() || null;
    return langAttribute;
  }

  static updateLangAttribute(
    value: string | null,
    langAttribute: LangAttribute | null,
  ): LangAttribute | null {
    if (!langAttribute) return null;
    const lang = this.getLang();
    if (lang === 'ar') langAttribute.ar = value?.trim() || null;
    if (lang === 'en') langAttribute.en = value?.trim() || null;
    return langAttribute;
  }

  static getLangAttributeValue(
    langAttribute: LangAttribute | null,
  ): string | null {
    if (!langAttribute) return null;
    const lang = this.getLang();
    if (lang === 'ar') return langAttribute.ar?.trim() || null;
    if (lang === 'en') return langAttribute.en?.trim() || null;
    return null;
  }
}
