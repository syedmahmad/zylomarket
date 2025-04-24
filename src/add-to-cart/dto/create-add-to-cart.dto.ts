// dto/create-add-to-cart.dto.ts
import { IsInt, Min } from 'class-validator';

export class CreateAddToCartDto {
  @IsInt()
  userId: number;

  @IsInt()
  productId: number;

  @IsInt()
  @Min(1)
  quantity: number;
}
