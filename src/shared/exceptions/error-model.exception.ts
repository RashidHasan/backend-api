export class ErrorModel {
  constructor(
    public readonly message: string,
    public readonly redirectUrl?: string | null,
    public readonly code?: string | null,
  ) {}
}
