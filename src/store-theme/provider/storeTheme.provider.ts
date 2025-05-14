import { StoreTheme } from "src/database/entity/storeTheme.entity";


export const storeThemeProvider = [
  {
    provide: 'STORE_THEME_REPOSITORY',
    useValue: StoreTheme,
  },
];
