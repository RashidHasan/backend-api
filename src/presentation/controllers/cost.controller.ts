import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CostService } from '../../application/services/cost.service';
import { Cost } from '../../domain/entities/cost.entity';
import { CreateCostDto } from '../dtos/create-cost.dto';
import { UpdateCostDto } from '../dtos/update-cost.dto';
import { BaseController } from './base-controller/base.controller';
import { Response } from '../../shared/dtos/response.dto';

@Controller('costs')
export class CostController extends BaseController<
  Cost,
  CreateCostDto,
  UpdateCostDto
> {
  constructor(private readonly costService: CostService) {
    super(costService, 'COST');
  }

  @Post('add-cost')
  async createCost(@Body() data: CreateCostDto): Promise<Response<Cost>> {
    return super.create(data);
  }

  @Get('get-all-costs')
  async findAllCosts(): Promise<Response<Cost[]>> {
    return super.findAll();
  }

  @Get('get-cost/:id')
  async findOneCost(@Param('id') id: string): Promise<Response<Cost>> {
    return super.findOne(id);
  }

  @Patch('update-cost/:id')
  async updateCost(
    @Param('id') id: string,
    @Body() data: UpdateCostDto,
  ): Promise<Response<Cost>> {
    return super.update(id, data);
  }

  @Delete('delete-cost/:id')
  async removeCost(@Param('id') id: string): Promise<Response<void>> {
    return super.remove(id);
  }
}
