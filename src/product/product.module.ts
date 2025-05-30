// @ts-ignore
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from 'src/database/entity/product.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductImage } from 'src/database/entity/product.images.entity';
import { CampaignProduct } from 'src/database/entity/campaign.product.entity';
import { SalesCampaign } from 'src/database/entity/sales.campaign.entity';
// @ts-ignore
import { productImageProvider } from 'src/product/Providers/productImage.provider';
// @ts-ignore
import { storeProvider } from 'src/product/Providers/store.provider';
// @ts-ignore
import { salesCampaignProvider } from 'src/product/Providers/saleCampaign.provider';
// @ts-ignore
import { campaignProductProvider } from 'src/product/Providers/campaign.product.provider';
// @ts-ignore
import { merchantProvider } from 'src/product/Providers/merchant.provider';
// @ts-ignore
import { productProvider } from 'src/product/Providers/product.provider';
import { userProvider } from './providers/user.provider';



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

