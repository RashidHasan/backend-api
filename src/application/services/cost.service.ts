import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cost } from '../../domain/entities/cost.entity';
import { BaseService } from './base-service/base.service';

@Injectable()
export class CostService extends BaseService<Cost> {
  constructor(
    @InjectRepository(Cost)
    repository: Repository<Cost>,
  ) {
    super(repository);
  }
}
