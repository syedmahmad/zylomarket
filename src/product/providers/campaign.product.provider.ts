// CAMPAIGN_PRODUCT_REPOSITORY

import { CampaignProduct } from "src/database/entity/campaign.product.entity";

export const campaignProductProvider = [
  {
    provide: 'CAMPAIGN_PRODUCT_REPOSITORY',
    useValue: CampaignProduct,
  },
];
