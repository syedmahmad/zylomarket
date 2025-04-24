import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { AddToCartModule } from './add-to-cart/add-to-cart.module';
import { SaleProductModule } from './sale-product/sale-product.module';
import { CustomiseStoreBannerModule } from './customise-store-banner/customise-store-banner.module';
import { WhyShopWithUsModule } from './why-shop-with-us/why-shop-with-us.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, ProductModule, AddToCartModule, SaleProductModule, CustomiseStoreBannerModule, WhyShopWithUsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
