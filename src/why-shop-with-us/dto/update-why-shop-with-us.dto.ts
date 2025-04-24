import { PartialType } from '@nestjs/mapped-types';
import { CreateWhyShopWithUsDto } from './create-why-shop-with-us.dto';

/**
 * DTO for updating a WhyShopSection. All fields are optional.
 */
export class UpdateWhyShopWithUsDto extends PartialType(CreateWhyShopWithUsDto) {}
