import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AddToCartService } from './add-to-cart.service';
import { CreateAddToCartDto } from './dto/create-add-to-cart.dto';
import { UpdateAddToCartDto } from './dto/update-add-to-cart.dto';

@Controller('cart')
export class AddToCartController {
  constructor(private readonly addToCartService: AddToCartService) {}

  /**
   * Add a product to the cart (guest only)
   */
  @Post('add')
  async addToCart(@Body() dto: CreateAddToCartDto) {
    return this.addToCartService.addToCart(dto);
  }

  /**
   * Get all cart items for a guest
   * Example: GET /cart?guestId=abc-123
   */
  @Get()
  async getCartItems(@Query('guestId') guestId: string) {
    return this.addToCartService.getCartItems(guestId);
  }

  /**
   * Update quantity of a cart item for a guest
   */
  @Patch('update')
  async updateQuantity(@Body() dto: UpdateAddToCartDto) {
    return this.addToCartService.updateQuantity(dto);
  }

  /**
   * Remove a product from guest's cart
   */
  @Delete('remove')
  async removeItem(
    @Query('guestId') guestId: string,
    @Query('productId') productId: string,
  ) {
    return this.addToCartService.removeFromCart(guestId, +productId);
  }

  /**
   * Clear the entire cart for a guest
   */
  @Delete('clear')
  async clearCart(@Query('guestId') guestId: string) {
    return this.addToCartService.clearCart(guestId);
  }
}
