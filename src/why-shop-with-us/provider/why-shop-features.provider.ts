// CAMPAIGN_PRODUCT_REPOSITORY

import { WhyShopFeature } from "src/database/entity/why-shop-feature.entity";
export const whyShopWithUSFeaturesProvider = [
  {
    provide: 'WHY_SHOP_FEATURE_REPOSITORY',
    useValue: WhyShopFeature,
  },
];
