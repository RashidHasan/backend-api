import { Column } from 'typeorm';

export abstract class TimeAudit {
  @Column({ type: 'timestamptz', nullable: true })
  createDate: Date | null = null;

  @Column({ type: 'timestamptz', nullable: true })
  updateDate: Date | null = null;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean = false;
}
