import sanitizeHtml from 'sanitize-html';

export class HtmlSanitizer {
  private static basicOptions: sanitizeHtml.IOptions = {
    allowedTags: [
      'img',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'p',
      'br',
      'hr',
      'ul',
      'ol',
      'li',
      'strong',
      'em',
      'u',
    ],
    allowedAttributes: {
      img: ['src', 'alt', 'title', 'width', 'height'],
      '*': ['class', 'style'],
    },
    allowedSchemes: ['http', 'https', 'data'],
  };

  static sanitize(input: string | null): string | null {
    if (!input || input.trim() === '') return input;
    return sanitizeHtml(input, this.basicOptions);
  }

  static sanitizeList(input: any[] | null): string[] | null {
    if (!input) return null;
    return input
      .map((item) => {
        if (typeof item === 'string') return this.sanitize(item) || '';
        return item ? this.sanitize(item.toString()) || '' : '';
      })
      .filter(Boolean);
  }

  static stripAllHtml(input: string | null): string | null {
    if (!input || input.trim() === '') return input;
    return sanitizeHtml(input, { allowedTags: [], allowedAttributes: {} });
  }

  static sanitizeAnyValue(value: any): any {
    if (typeof value === 'string') return this.sanitize(value) || value;
    if (Array.isArray(value)) return this.sanitizeList(value) || value;
    return value;
  }

  static stripAllHtmlAnyValue(value: any): any {
    if (typeof value === 'string') return this.stripAllHtml(value) || value;
    if (Array.isArray(value)) {
      return value.map((item) => {
        if (typeof item === 'string') return this.stripAllHtml(item);
        return item ? this.stripAllHtml(item.toString()) : item;
      });
    }
    return value;
  }
}
