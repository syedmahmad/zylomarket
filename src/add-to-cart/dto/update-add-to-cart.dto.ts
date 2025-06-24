// dto/update-add-to-cart.dto.ts
import { IsInt, Min, IsUUID } from 'class-validator';

export class UpdateAddToCartDto {
  @IsUUID()
  guestId: string;

  @IsInt()
  productId: number;

  @IsInt()
  @Min(1)
  quantity: number;
}
