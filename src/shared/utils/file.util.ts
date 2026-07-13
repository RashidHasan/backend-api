import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { JsonUtils } from './json.util';
import { SecurityUtil } from './security.util';
import {
  FileItem,
  FileServiceOwner,
} from '../../domain/value-objects/file-item.value-object';

export class FileUtils {
  static baseFolder: string = '';

  static copyFile(source: string, destination: string): boolean {
    try {
      fs.copyFileSync(source, destination);
      return true;
    } catch {
      return false;
    }
  }

  static moveFile(source: string, destination: string): boolean {
    try {
      fs.renameSync(source, destination);
      return true;
    } catch {
      return false;
    }
  }

  static createDirectory(dirPath: string): boolean {
    try {
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      return true;
    } catch {
      return false;
    }
  }

  static readResourceFile(filePath: string): string {
    return fs.readFileSync(path.resolve(process.cwd(), filePath), 'utf-8');
  }

  static readJsonFiles(folder: string): string[] {
    const result: string[] = [];
    const dir = path.resolve(process.cwd(), folder);
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        if (file.endsWith('.json')) {
          result.push(fs.readFileSync(path.join(dir, file), 'utf-8'));
        }
      }
    }
    return result;
  }

  static writeFile(filePath: string, content: string): void {
    fs.writeFileSync(filePath, content, 'utf-8');
  }

  private static getFileInfo(id: string): FileItem | null {
    const file = path.join(this.getUploadFolder(), `${id}.json`);
    if (!fs.existsSync(file)) return null;
    return JsonUtils.readValue<FileItem>(fs.readFileSync(file, 'utf-8'));
  }

  static getFilesInfo(attachments: string[]): FileItem[] {
    const result: FileItem[] = [];
    for (const attachment of attachments) {
      const info = this.getFileInfo(attachment);
      if (info) result.push(info);
    }
    return result;
  }

  static editFile(file: FileItem): boolean {
    const fullPath = path.join(this.getUploadFolder(), `${file.id}.json`);
    if (fs.existsSync(fullPath)) {
      const fileItem = JsonUtils.readValue<FileItem>(
        fs.readFileSync(fullPath, 'utf-8'),
      );
      fileItem.fileName = file.fileName;
      fs.unlinkSync(fullPath);
      fs.writeFileSync(
        fullPath,
        JsonUtils.writeValueAsString(fileItem),
        'utf-8',
      );
      return true;
    }
    return false;
  }

  static getUploadedFile(id: string): Buffer {
    return fs.readFileSync(path.join(this.getUploadFolder(), id));
  }

  static uploadFile(
    file: Express.Multer.File,
    serviceOwner: FileServiceOwner,
  ): FileItem | null {
    if (!file || file.size === 0) return null;

    const fileName = uuidv4();
    const fullPath = path.join(this.getUploadFolder(), fileName);
    fs.writeFileSync(fullPath, file.buffer);

    const ext = file.originalname.includes('.')
      ? file.originalname.split('.').pop()
      : '';
    const nameWithoutExt = file.originalname.substring(
      0,
      file.originalname.lastIndexOf('.'),
    );

    const fileItem: FileItem = {
      id: fileName,
      size: file.size,
      originalFilename: file.originalname,
      fileName: nameWithoutExt,
      contentType: file.mimetype,
      serviceOwner: serviceOwner,
      ext: ext,
      uploadedBy: SecurityUtil.userId(),
    };

    fs.writeFileSync(
      `${fullPath}.json`,
      JsonUtils.writeValueAsString(fileItem),
      'utf-8',
    );
    return fileItem;
  }

  private static getUploadFolder(): string {
    const uploadPath = this.getPath('upload');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    return uploadPath;
  }

  static getPath(...files: string[]): string {
    return path.join(this.baseFolder, ...files);
  }
}
