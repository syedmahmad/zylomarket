import { CartItem } from "src/database/entity/addToCart.entity";

export const addToCartProvider = [
  {
    provide: 'CART_ITEM_REPOSITORY',
    useValue: CartItem,
  },
];