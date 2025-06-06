import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AddToCartService } from './add-to-cart.service';
import { CreateAddToCartDto } from './dto/create-add-to-cart.dto';
import { UpdateAddToCartDto } from './dto/update-add-to-cart.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('cart')
export class AddToCartController {
  constructor(private readonly addToCartService: AddToCartService) {}

  /**
   * Add a product to the cart
   * Expects userId, productId, and quantity in body
   */
  @Post('add')
  @UseGuards(AuthGuard('jwt'))
  async addToCart(@Body() dto: CreateAddToCartDto) {
    const { userId, productId, quantity } = dto;
    return this.addToCartService.addToCart(userId, productId, quantity);
  }

  /**
   * Get all cart items for a user
   * Assumes userId is passed as a query param for now (until auth is integrated)
   */
  @Get(':userId')
  getCartItems(@Param('userId') userId: string) {
    return this.addToCartService.getCartItems(+userId);
  }

  /**
   * Update quantity of a cart item
   */
  @Patch('update/:userId/:productId')
  @UseGuards(AuthGuard('jwt'))
  updateQuantity(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
    @Body() updateAddToCartDto: UpdateAddToCartDto,
  ) {
    return this.addToCartService.updateQuantity(+userId, +productId, updateAddToCartDto);
  }

  /**
   * Remove a product from the cart
   */
  @Delete('remove/:productId/:userId')
  @UseGuards(AuthGuard('jwt'))
  removeItem(
    @Param('productId') productId: string,
    @Param('userId') userId: string,
  ) {
    return this.addToCartService.removeFromCart(+userId, +productId);
  }

  /**
   * Clear the cart for a user
   */
  @Delete('clear/:userId')
  @UseGuards(AuthGuard('jwt'))
  clearCart(@Param('userId') userId: string) {
    return this.addToCartService.clearCart(+userId);
  }
}
