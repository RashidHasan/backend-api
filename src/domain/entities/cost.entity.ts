import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { FullAudit } from '../base/full-audit.base';

@Entity('cost')
export class Cost extends FullAudit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null = null;

  @Column({ unique: true })
  code: number;

  @Column({ name: 'parent_id', type: 'uuid', nullable: true })
  parentId: string | null = null;

  @ManyToOne(() => Cost, (cost) => cost.children, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'parent_id' })
  parent: Cost | null;

  @OneToMany(() => Cost, (cost) => cost.parent)
  children: Cost[];
}
