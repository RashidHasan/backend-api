import { LangUtils } from '../../shared/utils/lang.util';

export class LangAttribute {
  es?: string | null = null;
  en?: string | null = null;
  ar?: string | null = null;

  constructor(partial?: Partial<LangAttribute>) {
    if (partial) {
      this.es = partial.es ?? null;
      this.en = partial.en ?? null;
      this.ar = partial.ar ?? null;
    }
  }

  toLangAttribute(): LangAttribute {
    return new LangAttribute({ es: this.es, en: this.en, ar: this.ar });
  }

  interpolate(map: Record<string, any>): LangAttribute {
    const replaceVars = (str?: string | null) => {
      if (!str) return str;
      return str.replace(/\{(\w+)\}/g, (_, k) =>
        map[k] !== undefined ? String(map[k]) : '',
      );
    };

    return new LangAttribute({
      es: replaceVars(this.es),
      en: replaceVars(this.en),
      ar: replaceVars(this.ar),
    });
  }

  current(): string | null {
    return LangUtils.getLangAttributeValue(this);
  }
}
