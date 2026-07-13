import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from '../../application/services/product.service';
import { Product } from '../../domain/entities/product.entity';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { BaseController } from './base-controller/base.controller';
import { Response } from '../../shared/dtos/response.dto';

@Controller('products')
export class ProductController extends BaseController<
  Product,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(private readonly productService: ProductService) {
    super(productService, 'PRODUCT');
  }

  @Post('add-product')
  async createProduct(
    @Body() data: CreateProductDto,
  ): Promise<Response<Product>> {
    return super.create(data);
  }

  @Get('get-all-products')
  async findAllProducts(): Promise<Response<Product[]>> {
    return super.findAll();
  }

  @Get('get-product/:id')
  async findOneProduct(@Param('id') id: string): Promise<Response<Product>> {
    return super.findOne(id);
  }

  @Patch('update-product/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() data: UpdateProductDto,
  ): Promise<Response<Product>> {
    return super.update(id, data);
  }

  @Delete('delete-product/:id')
  async removeProduct(@Param('id') id: string): Promise<Response<void>> {
    return super.remove(id);
  }
}
