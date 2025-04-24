// CAMPAIGN_PRODUCT_REPOSITORY

import { WhyShopSection } from "src/database/entity/why-shop-with-us.entity";


export const whyShopWithUSProvider = [
  {
    provide: 'WHY_SHOP_WITH_US_REPOSITORY',
    useValue: WhyShopSection,
  },
];
