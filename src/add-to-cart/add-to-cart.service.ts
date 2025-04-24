import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddToCartDto } from './dto/create-add-to-cart.dto';
import { UpdateAddToCartDto } from './dto/update-add-to-cart.dto';
import { CartItem } from 'src/database/entity/addToCart.entity';
// Assuming Product is a related model
import { Product } from 'src/database/entity/product.entity';

@Injectable()
export class AddToCartService {
  constructor(
    @Inject('CART_ITEM_REPOSITORY')
    private cartItemModel: typeof CartItem,
  ) { }

  /**
   * Add a product to the cart.
   * If already exists, increase quantity.
   */
  async addToCart(userId: number, productId: number, quantity: number) {
    const [item, created] = await this.cartItemModel.findOrCreate({
      where: { userId, productId },
      defaults: { quantity },
    });

    if (!created) {
      item.quantity += quantity;
      await item.save();
    }

    return item;
  }

  /**
   * Get all cart items for a user.
   * Includes product information.
   */
  async getCartItems(userId: number) {
    return this.cartItemModel.findAll({
      where: { userId },
      include: [Product],
    });
  }

  /**
   * Remove a specific product from a user's cart.
   */
  async removeFromCart(userId: number, productId: number) {
    const deleted = await this.cartItemModel.destroy({ where: { userId, productId } });
    if (!deleted) {
      throw new NotFoundException('Item not found in cart');
    }
    return { message: 'Item removed from cart' };
  }

  /**
   * Update quantity of a specific product in the cart.
   */
  async updateQuantity(
    userId: number,
    productId: number,
    updateAddToCartDto: UpdateAddToCartDto,
  ) {
    const { quantity } = updateAddToCartDto;

    const item = await this.cartItemModel.findOne({ where: { userId, productId } });
    if (!item) throw new NotFoundException('Item not in cart');

    // Optional: prevent setting 0 or negative quantity
    // if (quantity <= 0) throw new BadRequestException('Quantity must be greater than zero');

    if (quantity === undefined) {
      throw new Error('Quantity must be provided');
    }
    item.quantity = quantity;
    await item.save();
    return item;
  }

  /**
   * Clear all items in the cart for a user.
   */
  async clearCart(userId: number) {
    const deleted = await this.cartItemModel.destroy({ where: { userId } });
    return { message: `${deleted} item(s) removed from cart` };
  }
}
