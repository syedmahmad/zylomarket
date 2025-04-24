// CAMPAIGN_PRODUCT_REPOSITORY

import { CustomiseStoreBanner } from "src/database/entity/customise-store-banner.entity";

export const customiseStoreBannerProvider = [
  {
    provide: 'CUSTOMISE_STORE_BANNER_REPOSITORY',
    useValue: CustomiseStoreBanner,
  },
];
