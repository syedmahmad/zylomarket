import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { storeProvider } from './provider/store.provider';
import { SequelizeModule } from '@nestjs/sequelize';
// import { StoreTheme } from 'src/database/entity/storeTheme.entity';

@Module({
  
  controllers: [StoreController],
  providers: [StoreService,
    ...storeProvider
  ],
})
export class StoreModule {}


