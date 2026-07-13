import { Merchant } from "src/database/entity/merchant.entity";


export const merchantProvider = [
  {
    provide: 'MERCHANT_REPOSITORY',
    useValue: Merchant,
  },
];
