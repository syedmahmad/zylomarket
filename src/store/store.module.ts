import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { storeProvider } from './provider/store.provider';
import { SequelizeModule } from '@nestjs/sequelize';
import { userProvider } from './provider/user.provider';

@Module({
  
  controllers: [StoreController],
  providers: [StoreService,
    ...storeProvider,
    ...userProvider
  ],
})
export class StoreModule {}


