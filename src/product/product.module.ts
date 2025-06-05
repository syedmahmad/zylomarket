import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from 'src/database/entity/product.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductImage } from 'src/database/entity/product.images.entity';
import { CampaignProduct } from 'src/database/entity/campaign.product.entity';
import { SalesCampaign } from 'src/database/entity/sales.campaign.entity';
import { userProvider } from './providers/user.provider';
import { productProvider } from './providers/product.provider';
import { productImageProvider } from './providers/productImage.provider';
import { storeProvider } from './providers/store.provider';
import { salesCampaignProvider } from './providers/saleCampaign.provider';
import { campaignProductProvider } from './providers/campaign.product.provider';
import { merchantProvider } from './providers/merchant.provider';






@Module({
  imports: [SequelizeModule.forFeature([Product,
    ProductImage, CampaignProduct, SalesCampaign])],
  controllers: [ProductController],
  providers: [ProductService,
    ...productProvider,
    ...productImageProvider,
    ...storeProvider,
    ...salesCampaignProvider,
    ...campaignProductProvider,
    ...merchantProvider,
    ...userProvider
  ],
})
export class ProductModule { }

