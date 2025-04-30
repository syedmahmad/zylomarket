import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from 'src/database/entity/product.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductImage } from 'src/database/entity/product.images.entity';
import { CampaignProduct } from 'src/database/entity/campaign.product.entity';
import { SalesCampaign } from 'src/database/entity/sales.campaign.entity';
import { productImageProvider } from 'src/product/Providers/productImage.provider';
import { storeProvider } from 'src/product/Providers/store.provider';
import { salesCampaignProvider } from 'src/product/Providers/saleCampaign.provider';
import { campaignProductProvider } from 'src/product/Providers/campaign.product.provider';
import { merchantProvider } from 'src/product/Providers/merchant.provider';
import { productProvider } from 'src/product/Providers/product.provider';



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
    ...merchantProvider
  ],
})
export class ProductModule { }

