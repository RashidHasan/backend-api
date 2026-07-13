import { chromium, Browser, Page } from 'playwright';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FileUtils } from './file.util';
import { HtmlUtils } from './html.util';
import {
  PDFOptions,
  defaultPDFOptions,
} from '../../domain/types/pdf-options.type';

export class PDFUtils {
  private static browser: Browser | null = null;

  private static async getBrowser(): Promise<Browser> {
    if (!this.browser) {
      this.browser = await chromium.launch({ headless: true });
    }
    return this.browser;
  }

  static async export(
    templatePath: string,
    id: string = uuidv4(),
    model: any = {},
    options: PDFOptions = defaultPDFOptions,
  ): Promise<string> {
    const browser = await this.getBrowser();
    const page: Page = await browser.newPage();

    const html = HtmlUtils.generate(templatePath, model);
    await page.setContent(html);

    const generatedDir = FileUtils.getPath('upload', 'generated');
    FileUtils.createDirectory(generatedDir);

    const pdfPath = path.join(generatedDir, `${id}.pdf`);
    const htmlPath = path.join(generatedDir, `${id}.html`);
    FileUtils.writeFile(htmlPath, html);

    await page.pdf({
      path: pdfPath,
      landscape: options.landscape,
      format: options.format,
      displayHeaderFooter: true,
      printBackground: true,
      margin: {
        top: options.marginTop,
        bottom: options.marginBottom,
        left: options.marginLeft,
        right: options.marginRight,
      },
      headerTemplate: options.headerTemplate,
      footerTemplate: options.footerTemplate,
    });

    await page.setViewportSize({ width: 1280, height: 720 });
    await page.close();

    return id;
  }

  static async closeBrowser(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}
