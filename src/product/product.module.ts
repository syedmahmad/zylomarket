import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from 'src/database/entity/product.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductImage } from 'src/database/entity/product.images.entity';
import { CampaignProduct } from 'src/database/entity/campaign.product.entity';
import { SalesCampaign } from 'src/database/entity/sales.campaign.entity';
// import { userProvider } from './providers/user.provider';
import { productProvider } from './Providers/product.provider';
import { productImageProvider } from './Providers/productImage.provider';
import { storeProvider } from './Providers/store.provider';
import { salesCampaignProvider } from './Providers/saleCampaign.provider';
import { campaignProductProvider } from './Providers/campaign.product.provider';
import { merchantProvider } from './Providers/merchant.provider';
import { userProvider } from './Providers/user.provider';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Product,
      ProductImage,
      CampaignProduct,
      SalesCampaign,
    ]),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    ...productProvider,
    ...productImageProvider,
    ...storeProvider,
    ...salesCampaignProvider,
    ...campaignProductProvider,
    ...merchantProvider,
    ...userProvider,
  ],
})
export class ProductModule {}
