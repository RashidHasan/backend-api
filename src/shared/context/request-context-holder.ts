import { AsyncLocalStorage } from 'async_hooks';
import { RequestContext } from '../constants/request-context.interface';

export class RequestContextHolder {
  private static readonly asyncLocalStorage =
    new AsyncLocalStorage<RequestContext>();

  static runWithContext(context: RequestContext, callback: () => void): void {
    this.asyncLocalStorage.run(context, callback);
  }

  static getContext(): RequestContext | undefined {
    return this.asyncLocalStorage.getStore();
  }

  static getContextOrThrow(): RequestContext {
    const context = this.getContext();
    if (!context) {
      throw new Error('RequestContext not available');
    }
    return context;
  }
}
