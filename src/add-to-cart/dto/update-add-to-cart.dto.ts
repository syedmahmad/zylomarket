import { PartialType } from '@nestjs/mapped-types';
import { CreateAddToCartDto } from './create-add-to-cart.dto';

export class UpdateAddToCartDto extends PartialType(CreateAddToCartDto) {}
