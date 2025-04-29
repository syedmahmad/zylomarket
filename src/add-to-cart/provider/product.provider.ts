import { Product } from "src/database/entity/product.entity";

export const productProvider = [
  {
    provide: 'PRODUCT_REPOSITORY',
    useValue: Product,
  },
];
