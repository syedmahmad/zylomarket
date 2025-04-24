import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsInt,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  price: number;

  @IsInt()
  status: number;

  @IsOptional()
  @IsInt()
  stock?: number;

  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imageUrls?: string[];

  /**
   * Optional: If this product is immediately part of a sales campaign,
   * frontend can pass the campaignId to associate it directly.
   */
  @IsOptional()
  @IsInt()
  campaignId?: number;

  /**
   * Optional: Frontend can also specify the discounted sale price.
   * This is especially useful if the discount varies per product in a campaign.
   */
  @IsOptional()
  @IsNumber()
  salePrice?: number;
}
