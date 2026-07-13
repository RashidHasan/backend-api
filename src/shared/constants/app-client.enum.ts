export enum AppClient {
  WEB = 'WEB',
  ANDROID = 'ANDROID',
  MOBILE = 'MOBILE',
  IOS = 'IOS',
}

export function getAppClientFromString(value: string | undefined): AppClient {
  if (!value) return AppClient.WEB;
  const upperValue = value.toUpperCase();
  return Object.values(AppClient).includes(upperValue as AppClient)
    ? (upperValue as AppClient)
    : AppClient.WEB;
}
