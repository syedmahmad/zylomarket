import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from 'src/database/entity/product.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { productProvider } from './Providers/product.provider';
import { ProductImage } from 'src/database/entity/product.images.entity';
import { productImageProvider } from './Providers/product-image.provider';
import { storeProvider } from './Providers/store.provider';
import { CampaignProduct } from 'src/database/entity/campaign.product.entity';
import { SalesCampaign } from 'src/database/entity/sales.campaign.entity';
import { salesCampaignProvider } from './Providers/saleCampaign.provider';
import { campaignProductProvider } from './Providers/campaign.product.provider';

@Module({
  imports: [SequelizeModule.forFeature([Product,
    ProductImage, CampaignProduct, SalesCampaign])],
  controllers: [ProductController],
  providers: [ProductService,
    ...productProvider,
    ...productImageProvider,
    ...storeProvider,
    ...salesCampaignProvider,
    ...campaignProductProvider
  ],
})
export class ProductModule { }

