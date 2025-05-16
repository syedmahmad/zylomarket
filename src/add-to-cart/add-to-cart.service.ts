import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddToCartDto } from './dto/create-add-to-cart.dto';
import { UpdateAddToCartDto } from './dto/update-add-to-cart.dto';
import { CartItem } from 'src/database/entity/addToCart.entity';
// Assuming Product is a related model
import { Product } from 'src/database/entity/product.entity';
import { Merchant } from 'src/database/entity/merchant.entity';
import { Store } from 'src/database/entity/store.entity';

@Injectable()
export class AddToCartService {
  constructor(
    @Inject('CART_ITEM_REPOSITORY')
    private cartItemModel: typeof CartItem,

    @Inject('MERCHANT_REPOSITORY')
    private merchantRepository: typeof Merchant,
  
    @Inject('STORE_REPOSITORY')
    private storeRepository: typeof Store,

    @Inject('PRODUCT_REPOSITORY')
    private productRepository: typeof Product
  ) { }

   /**
   * Add a product to the cart.
   * If already exists, increase quantity.
   */
   async addToCart(userId: number, productId: number, quantity: number) {
    if (!productId) {
      throw new Error('Invalid productId: undefined');
    }

    // Step 1: Find the product
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });


    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found.`);
    }

    // // Step 2: Optional - validate store exists (skip if not needed)
    // const store = await this.storeRepository.findOne({
    //   where: { ownerId: userId },
    // });


    // if (!store) {
    //   throw new NotFoundException(`Store with ID ${product.storeId} not found.`);
    // }

    // Step 3: Validate merchant
    const merchant = await this.merchantRepository.findOne({
      where: { userId: userId, storeId: userId },
    });

    if (!merchant) {
      throw new NotFoundException(
        `Merchant with ID ${product.merchantId} not found in store ${userId}.`,
      );
    }

    // Step 4: Create or update CartItem with merchantId
    const [item, created] = await this.cartItemModel.findOrCreate({
      where: { userId, productId },
      defaults: {
        quantity,
        merchantId: merchant.id,
      },
    });

    if (!created) {
      item.quantity += quantity;
      await item.save();
    }

    return item;
  }

  /**
   * Add a product to the cart.
   * If already exists, increase quantity.
   */
  // async addToCart(userId: number, productId: number, quantity: number) {
  //   const [item, created] = await this.cartItemModel.findOrCreate({
  //     where: { userId, productId },
  //     defaults: { quantity },
  //   });

  //   if (!created) {
  //     item.quantity += quantity;
  //     await item.save();
  //   }

  //   return item;
  // }

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
