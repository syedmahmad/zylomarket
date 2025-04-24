import { IsString, IsNotEmpty, IsInt, ValidateNested, ArrayMinSize, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO for creating a WhyShopFeature.
 */
class CreateWhyShopFeatureDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}

/**
 * DTO for creating a WhyShopSection with nested features.
 */
export class CreateWhyShopWithUsDto {
    @IsNumber()
    id: number;
    @IsString()
    @IsNotEmpty()
    sectionTitle: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @ValidateNested({ each: true })
    @Type(() => CreateWhyShopFeatureDto)
    @IsOptional()
    features?: CreateWhyShopFeatureDto[];
}
