import { Request } from 'express';
import { RequestContextHolder } from '../context/request-context-holder';

export class CommonUtils {
  static getCurrentRequest(): Request | null {
    try {
      const context = RequestContextHolder.getContext();
      return context?.req || null;
    } catch {
      return null;
    }
  }
}
