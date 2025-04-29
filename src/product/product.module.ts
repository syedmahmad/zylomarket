import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from 'src/database/entity/product.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductImage } from 'src/database/entity/product.images.entity';
import { CampaignProduct } from 'src/database/entity/campaign.product.entity';
import { SalesCampaign } from 'src/database/entity/sales.campaign.entity';
import { productProvider } from 'src/product/providers/product.provider';
import { productImageProvider } from 'src/product/providers/productImage.provider';
import { storeProvider } from 'src/product/providers/store.provider';
import { salesCampaignProvider } from 'src/product/providers/saleCampaign.provider';
import { campaignProductProvider } from 'src/product/providers/campaign.product.provider';
import { merchantProvider } from 'src/product/providers/merchant.provider';



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

