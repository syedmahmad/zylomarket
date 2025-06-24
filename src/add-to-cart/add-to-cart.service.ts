import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateAddToCartDto } from './dto/create-add-to-cart.dto';
import { UpdateAddToCartDto } from './dto/update-add-to-cart.dto';
import { CartItem } from 'src/database/entity/addToCart.entity';
import { Product } from 'src/database/entity/product.entity';
import { Merchant } from 'src/database/entity/merchant.entity';

@Injectable()
export class AddToCartService {
  constructor(
    @Inject('CART_ITEM_REPOSITORY')
    private readonly cartItemModel: typeof CartItem,

    @Inject('MERCHANT_REPOSITORY')
    private readonly merchantRepository: typeof Merchant,

    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: typeof Product
  ) {}

  /**
   * Add product to cart for a guest
   */
  async addToCart(dto: CreateAddToCartDto) {
    const { guestId, productId, quantity } = dto;

    console.log('dto',dto)

    if (!guestId || !productId || quantity < 1) {
      throw new BadRequestException('Invalid input for cart item');
    }

    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException(`Product with ID ${productId} not found.`);

    const merchant = await this.merchantRepository.findOne({
      where: { id: product.dataValues.merchantId },
    });
    if (!merchant) throw new NotFoundException('Associated merchant not found');

    const [item, created] = await this.cartItemModel.findOrCreate({
      where: { guestId, productId },
      defaults: {
        guestId,
        productId,
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
   * Get all cart items for a guest
   */
  async getCartItems(guestId: string) {
    if (!guestId) throw new BadRequestException('guestId is required');

    return this.cartItemModel.findAll({
      where: { guestId },
      include: [
        {
          model: Product,
          include: ['images'], // assuming you have this relation set up
        },
      ],
    });
  }

  /**
   * Update quantity of a specific product in the cart
   */
  async updateQuantity(dto: UpdateAddToCartDto) {
    const { guestId, productId, quantity } = dto;

    if (!guestId || !productId || quantity < 1) {
      throw new BadRequestException('Invalid input');
    }

    const item = await this.cartItemModel.findOne({
      where: { guestId, productId },
    });

    if (!item) {
      throw new NotFoundException('Cart item not found for update');
    }

    item.quantity = quantity;
    await item.save();

    return item;
  }

  /**
   * Remove a specific product from guest's cart
   */
  async removeFromCart(guestId: string, productId: number) {
    if (!guestId || !productId) {
      throw new BadRequestException('guestId and productId are required');
    }

    const deleted = await this.cartItemModel.destroy({
      where: { guestId, productId },
    });

    if (!deleted) {
      throw new NotFoundException('Cart item not found to delete');
    }

    return { message: 'Item removed from cart' };
  }

  /**
   * Clear all items in the cart for a guest
   */
  async clearCart(guestId: string) {
    if (!guestId) throw new BadRequestException('guestId is required');

    const deleted = await this.cartItemModel.destroy({ where: { guestId } });

    return { message: `${deleted} item(s) removed from cart` };
  }
}
