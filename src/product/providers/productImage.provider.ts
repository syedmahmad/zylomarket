import { ProductImage } from "src/database/entity/product.images.entity";


export const productImageProvider = [
  {
    provide: 'PRODUCT_IMAGE_REPOSITORY',
    useValue: ProductImage,
  },
];
