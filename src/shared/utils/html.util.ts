import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

export class HtmlUtils {
  static generate(templatePath: string, model: any): string {
    const fullPath = path.resolve(process.cwd(), 'templates', templatePath);
    if (!fs.existsSync(fullPath)) return '';
    const templateContent = fs.readFileSync(fullPath, 'utf-8');
    const compiledTemplate = Handlebars.compile(templateContent);
    return compiledTemplate(model).trim();
  }
}
