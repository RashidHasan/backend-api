import { IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateCostDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  code: number;

  @IsUUID()
  @IsOptional()
  parentId?: string;
}
