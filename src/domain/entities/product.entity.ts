import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { FullAudit } from '../base/full-audit.base';

@Entity('products')
export class Product extends FullAudit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null = null;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int', default: 0 })
  stock: number;
}
