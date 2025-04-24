import { Module } from '@nestjs/common';
import { AddToCartService } from './add-to-cart.service';
import { AddToCartController } from './add-to-cart.controller';
import { addToCartProvider } from './provider/cart.provider';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartItem } from 'src/database/entity/addToCart.entity';

@Module({
  imports: [SequelizeModule.forFeature([CartItem])],
  controllers: [AddToCartController],
  providers: [AddToCartService,
    ...addToCartProvider
  ],
})
export class AddToCartModule {}
