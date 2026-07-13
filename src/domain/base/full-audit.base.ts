import { Column } from 'typeorm';
import { TimeAudit } from './time-audit.base';

export abstract class FullAudit extends TimeAudit {
  @Column({ type: 'uuid', nullable: true })
  createById: string | null = null;

  @Column({ type: 'uuid', nullable: true })
  updateById: string | null = null;
}
