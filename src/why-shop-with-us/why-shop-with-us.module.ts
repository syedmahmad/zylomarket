import { Module } from '@nestjs/common';
import { WhyShopWithUsService } from './why-shop-with-us.service';
import { WhyShopWithUsController } from './why-shop-with-us.controller';
import { whyShopWithUSProvider } from './provider/why-shop-with-us.provider';
import { whyShopWithUSFeaturesProvider } from './provider/why-shop-features.provider';
import { SequelizeModule } from '@nestjs/sequelize';
import { WhyShopSection } from 'src/database/entity/why-shop-with-us.entity';
import { WhyShopFeature } from 'src/database/entity/why-shop-feature.entity';
import { storeProvider } from './provider/store.provider';


@Module({
  imports: [
    SequelizeModule.forFeature([WhyShopSection, WhyShopFeature]),
  ],
  controllers: [WhyShopWithUsController],
  providers: [WhyShopWithUsService,
    ...whyShopWithUSProvider,
    ...whyShopWithUSFeaturesProvider,
    ...storeProvider
  ],
})
export class WhyShopWithUsModule {}
