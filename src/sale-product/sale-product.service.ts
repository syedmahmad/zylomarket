import { Inject, Injectable, NotFoundException } from '@nestjs/common';
// import { CreateSaleProductDto } from './dto/create-sale-product.dto';
// import { UpdateSaleProductDto } from './dto/update-sale-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CampaignProduct } from 'src/database/entity/campaign.product.entity';
import { Product } from 'src/database/entity/product.entity';
import { SalesCampaign } from 'src/database/entity/sales.campaign.entity';
import { Store } from 'src/database/entity/store.entity';

@Injectable()
export class SaleProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: typeof Product,
    @Inject('SALES_CAMPAIGN_REPOSITORY')
    private salesCampaignRepository: typeof SalesCampaign,

    @Inject('STORE_REPOSITORY')
    private storeRepository: typeof Store,
  ) { }


  async getSaleProducts(id: number) {
    // const store = await this.storeRepository.findOne({
    //   where: { ownerId: id },
    // });
    // if (!store) {
    //   throw new NotFoundException(`Store with ID ${id} not found`);
    // }

    const productsOnSale = await this.productRepository.findAll({
      where: {
        isOnSale: true,
        storeId: id,
      },
      include: { all: true },
    });


    if (!productsOnSale?.length) {
      return [];
    }

    // const storeId = productsOnSale[0].dataValues.storeId;

    const saleCampaigns = await this.salesCampaignRepository.findAll({
      where: { storeId: id },
      include: { all: true },
    });

    return {
      products: productsOnSale,
      campaigns: saleCampaigns,
    };
  }

}
