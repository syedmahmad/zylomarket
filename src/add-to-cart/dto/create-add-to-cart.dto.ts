// dto/create-add-to-cart.dto.ts
import { IsInt, Min, IsUUID, IsString } from 'class-validator';

export class CreateAddToCartDto {
  @IsUUID()
  guestId: string;

  @IsInt()
  productId: number;

  @IsInt()
  @Min(1)
  quantity: number;
}
