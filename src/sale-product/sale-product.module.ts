import { Module } from '@nestjs/common';
import { SaleProductService } from './sale-product.service';
import { SaleProductController } from './sale-product.controller';
import { productProvider } from './provider/product.provider';
import { salesCampaignProvider } from './provider/saleCampaign.provider';
import { campaignProductProvider } from './provider/campaign.product.provider';
import { storeProvider } from './provider/store.provider';

@Module({
  controllers: [SaleProductController],
  providers: [SaleProductService,
    ...productProvider,
    ...salesCampaignProvider,
    ...campaignProductProvider,
    ...storeProvider
  ],
})
export class SaleProductModule { }
