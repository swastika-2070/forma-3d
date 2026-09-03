import {
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  category: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  modelUrl: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}