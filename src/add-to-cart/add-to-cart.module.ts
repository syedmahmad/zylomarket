import { Module } from '@nestjs/common';
import { AddToCartService } from './add-to-cart.service';
import { AddToCartController } from './add-to-cart.controller';
import { addToCartProvider } from './provider/cart.provider';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartItem } from 'src/database/entity/addToCart.entity';
import { merchantProvider } from './provider/merchant.provider';
import { storeProvider } from './provider/store.provider';
import { productProvider } from './provider/product.provider';

@Module({
  imports: [SequelizeModule.forFeature([CartItem])],
  controllers: [AddToCartController],
  providers: [AddToCartService,
    ...addToCartProvider,
    ...merchantProvider,
    ...storeProvider,
    ...productProvider
  ],
})
export class AddToCartModule {}
