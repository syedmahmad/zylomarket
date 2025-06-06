import { Module, OnModuleInit } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { addAuditTrailHook } from './database/database.hooks'; // <-- adjust path if needed

// Your other imports...
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
import { OurCustomerSectionModule } from './our-customer-section/our-customer-section.module';
import { MerchantsModule } from './merchants/merchants.module';
import { StoreModule } from './store/store.module';
import { StoreThemeModule } from './store-theme/store-theme.module';
import { EmailVerificationModule } from './email-verification/email-verification.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    ProductModule,
    AddToCartModule,
    SaleProductModule,
    CustomiseStoreBannerModule,
    WhyShopWithUsModule,
    OurCustomerSectionModule,
    MerchantsModule,
    StoreModule,
    StoreThemeModule,
    EmailVerificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly sequelize: Sequelize) {}

  onModuleInit() {
    addAuditTrailHook(this.sequelize); // ✅ Call the hook here
  }
}
