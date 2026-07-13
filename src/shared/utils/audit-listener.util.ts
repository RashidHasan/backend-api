import { CalendarUtils } from './calendar.util';
import { SecurityUtil } from './security.util';
import { TimeAudit } from '../../domain/base/time-audit.base';
import { FullAudit } from '../../domain/base/full-audit.base';

export class AuditListener {
  static prePersistOperation(obj: any): void {
    const now = CalendarUtils.now().toDate();
    const userId = SecurityUtil.userId();

    if (obj instanceof TimeAudit) {
      obj.createDate = now;
      obj.updateDate = now;
    }

    if (obj instanceof FullAudit) {
      obj.createDate = now;
      obj.updateDate = now;

      if (userId) {
        obj.createById = userId;
        obj.updateById = userId;
      }
    }
  }

  static preUpdateOperation(obj: any): void {
    const now = CalendarUtils.now().toDate();
    const userId = SecurityUtil.userId();

    if (obj instanceof TimeAudit) {
      obj.updateDate = now;
    }

    if (obj instanceof FullAudit) {
      obj.updateDate = now;

      if (userId) {
        obj.updateById = userId;
      }
    }
  }
}
