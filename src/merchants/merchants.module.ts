import { Module } from '@nestjs/common';
import { MerchantsService } from './merchants.service';
import { MerchantsController } from './merchants.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Merchant } from 'src/database/entity/merchant.entity';
import { merchantProvider } from './providers/merchant.provider';
import { storeProvider } from './providers/store.provider';
import { userProvider } from './providers/user.provider';

@Module({
  imports: [SequelizeModule.forFeature([Merchant])],
  controllers: [MerchantsController],
  providers: [MerchantsService,
    ...merchantProvider,
    ...storeProvider,
    ...userProvider
  ],
})
export class MerchantsModule {}

