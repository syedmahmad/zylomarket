import { Module } from '@nestjs/common';
import { StoreThemeService } from './store-theme.service';
import { StoreThemeController } from './store-theme.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { StoreTheme } from 'src/database/entity/storeTheme.entity';
import { storeThemeProvider } from './provider/storeTheme.provider';
import { storeProvider } from './provider/store.provider';

@Module({
  imports: [SequelizeModule.forFeature([StoreTheme])],
  controllers: [StoreThemeController],
  providers: [StoreThemeService,
    ...storeThemeProvider,
    ...storeProvider
  ],
})
export class StoreThemeModule {}
