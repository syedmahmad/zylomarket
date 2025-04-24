import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, IsBoolean } from 'class-validator';
import { TextPosition } from 'src/database/entity/customise-store-banner.entity';

export class CreateCustomiseStoreBannerDto {
  @IsInt()
  storeId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  buttonText?: string;

  @IsString()
  @IsOptional()
  buttonLink?: string;

  @IsEnum(TextPosition)
  @IsOptional()
  textPosition?: TextPosition;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
