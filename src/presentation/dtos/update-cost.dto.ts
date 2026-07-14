import { IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class UpdateCostDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  code?: number;

  @IsUUID()
  @IsOptional()
  parentId?: string;
}
