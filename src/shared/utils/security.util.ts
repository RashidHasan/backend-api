import { Request } from 'express';
import { CommonUtils } from './common.util';
import { ConverterUtils } from './converter.util';

interface AuthenticatedRequest extends Request {
  user?: {
    id?: string;
    username?: string;
    roles?: string[];
  };
}

export class SecurityUtil {
  static userId(): string | null {
    try {
      const req =
        CommonUtils.getCurrentRequest() as AuthenticatedRequest | null;
      const user = req?.user;
      if (user && user.id) {
        return ConverterUtils.convertToUUID(user.id);
      }
      return null;
    } catch {
      return null;
    }
  }

  static username(): string | null {
    try {
      const req =
        CommonUtils.getCurrentRequest() as AuthenticatedRequest | null;
      return req?.user?.username || null;
    } catch {
      return null;
    }
  }

  static roles(): Set<string> {
    try {
      const req =
        CommonUtils.getCurrentRequest() as AuthenticatedRequest | null;
      const roles: string[] = req?.user?.roles || [];
      return new Set(
        roles.map((r) => (r.startsWith('ROLE_') ? r.substring(5) : r)),
      );
    } catch {
      return new Set();
    }
  }

  static login(token: string | null, res: any, systemProperty: any): any {
    const cookieOptions = {
      maxAge: (systemProperty.expiryTimeInDays || 1000) * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: systemProperty.backendDomain?.includes('https') === true,
      path: '/',
      domain: systemProperty.cookieDomain,
    };

    res.cookie(systemProperty.tokenName || 'token', token, cookieOptions);
    return cookieOptions;
  }
}
