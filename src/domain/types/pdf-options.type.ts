export interface PDFOptions {
  landscape?: boolean;
  format?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  headerTemplate?: string;
  footerTemplate?: string;
}

export const defaultPDFOptions: PDFOptions = {
  landscape: false,
  format: 'A4',
  marginTop: '0px',
  marginBottom: '0px',
  marginLeft: '0px',
  marginRight: '0px',
  headerTemplate: ' ',
  footerTemplate: ' ',
};
