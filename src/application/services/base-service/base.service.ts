import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, DeepPartial, FindOptionsWhere } from 'typeorm';
import { FullAudit } from '../../../domain/base/full-audit.base';
import { AuditListener } from '../../../shared/utils/audit-listener.util';

@Injectable()
export abstract class BaseService<T extends FullAudit> {
  constructor(protected readonly repository: Repository<T>) {}

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    AuditListener.prePersistOperation(entity);
    return await this.repository.save(entity as DeepPartial<T>);
  }

  async findAll(): Promise<T[]> {
    return await this.repository.find({
      where: { isDeleted: false } as unknown as FindOptionsWhere<T>,
    });
  }

  async findOne(id: string): Promise<T> {
    const entity = await this.repository.findOne({
      where: { id, isDeleted: false } as unknown as FindOptionsWhere<T>,
    });
    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    return entity;
  }

  async update(id: string, data: DeepPartial<T>): Promise<T> {
    const entity = await this.findOne(id);
    Object.assign(entity, data);
    AuditListener.preUpdateOperation(entity);
    return await this.repository.save(entity as DeepPartial<T>);
  }

  async remove(id: string): Promise<void> {
    const entity = await this.findOne(id);
    entity.isDeleted = true;
    AuditListener.preUpdateOperation(entity);
    await this.repository.save(entity as DeepPartial<T>);
  }
}
