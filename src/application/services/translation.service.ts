import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TranslationService implements OnModuleInit {
  private readonly translations = new Map<string, Record<string, string>>();

  onModuleInit(): void {
    this.reload();
  }

  translate(key: string, lang: string, ...args: any[]): string {
    const langTranslations =
      this.translations.get(lang) || this.translations.get('en');

    if (!langTranslations || !langTranslations[key]) {
      return key;
    }

    let template = langTranslations[key];

    if (args.length > 0) {
      args.forEach((arg, index) => {
        template = template.replace(
          new RegExp(`\\{${index}\\}`, 'g'),
          String(arg),
        );
      });
    }

    return template;
  }

  hasKey(key: string, lang: string): boolean {
    const langTranslations =
      this.translations.get(lang) || this.translations.get('en');
    return !!(langTranslations && langTranslations[key]);
  }

  reload(): void {
    const i18nPath = path.join(process.cwd(), 'src', 'i18n');

    if (fs.existsSync(i18nPath)) {
      const files = fs.readdirSync(i18nPath);

      for (const file of files) {
        if (file.endsWith('.json')) {
          const lang = file.replace('.json', '');
          const content = fs.readFileSync(path.join(i18nPath, file), 'utf-8');
          this.translations.set(lang, JSON.parse(content));
        }
      }
    }
  }
}
