import { Store } from "src/database/entity/store.entity";


export const storeProvider = [
  {
    provide: 'STORE_REPOSITORY',
    useValue: Store,
  },
];
