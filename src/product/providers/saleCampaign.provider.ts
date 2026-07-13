// SALES_CAMPAIGN_REPOSITORY

import { SalesCampaign } from "src/database/entity/sales.campaign.entity";

export const salesCampaignProvider = [
  {
    provide: 'SALES_CAMPAIGN_REPOSITORY',
    useValue: SalesCampaign,
  },
];
