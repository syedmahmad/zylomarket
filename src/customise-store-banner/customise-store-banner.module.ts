import { Module } from '@nestjs/common';
import { CustomiseStoreBannerService } from './customise-store-banner.service';
import { CustomiseStoreBannerController } from './customise-store-banner.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomiseStoreBanner } from 'src/database/entity/customise-store-banner.entity';
import { customiseStoreBannerProvider } from './provider/customiseStore.provider';
import { storeProvider } from './provider/store.provider';
import { userProvider } from './provider/user.provider';

@Module({
  imports: [SequelizeModule.forFeature([CustomiseStoreBanner])],
  controllers: [CustomiseStoreBannerController],
  providers: [CustomiseStoreBannerService,
    ...customiseStoreBannerProvider,
    ...storeProvider,
    ...userProvider
  ],
})
export class CustomiseStoreBannerModule { }
