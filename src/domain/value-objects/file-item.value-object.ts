export enum FileServiceOwner {
  COMMON = 'COMMON',
}

export interface FileItem {
  id: string;
  size: number;
  fileName?: string | null;
  originalFilename?: string | null;
  contentType?: string | null;
  ext?: string | null;
  serviceOwner: FileServiceOwner;
  uploadedBy?: string | null;
}

export interface FileItemShort {
  id: string;
}
