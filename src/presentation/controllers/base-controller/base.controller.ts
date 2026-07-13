import { DeepPartial } from 'typeorm';
import { BaseService } from '../../../application/services/base-service/base.service';
import { FullAudit } from '../../../domain/base/full-audit.base';
import { Response } from '../../../shared/dtos/response.dto';

export abstract class BaseController<T extends FullAudit, C, U> {
  protected constructor(
    protected readonly service: BaseService<T>,
    protected readonly entityName: string = 'RECORD',
  ) {}

  async create(data: C): Promise<Response<T>> {
    const result = await this.service.create(data as DeepPartial<T>);
    return Response.success(result, `${this.entityName}_CREATED_SUCCESSFULLY`);
  }

  async findAll(): Promise<Response<T[]>> {
    const result = await this.service.findAll();
    return Response.success(
      result,
      `${this.entityName}_RETRIEVED_SUCCESSFULLY`,
    );
  }

  async findOne(id: string): Promise<Response<T>> {
    const result = await this.service.findOne(id);
    return Response.success(
      result,
      `${this.entityName}_RETRIEVED_SUCCESSFULLY`,
    );
  }

  async update(id: string, data: U): Promise<Response<T>> {
    const result = await this.service.update(id, data as DeepPartial<T>);
    return Response.success(result, `${this.entityName}_UPDATED_SUCCESSFULLY`);
  }

  async remove(id: string): Promise<Response<void>> {
    await this.service.remove(id);
    return Response.success(null, `${this.entityName}_DELETED_SUCCESSFULLY`);
  }
}
