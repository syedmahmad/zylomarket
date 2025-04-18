import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from 'src/database/entity/product.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { productProvider } from './Providers/product.provider';
import { ProductImage } from 'src/database/entity/product.images.entity';
import { productImageProvider } from './Providers/product-image.provider';
import { storeProvider } from './Providers/store.provider';

@Module({
  imports: [SequelizeModule.forFeature([Product, ProductImage])],
  controllers: [ProductController],
  providers: [ProductService,
    ...productProvider,
    ...productImageProvider,
    ...storeProvider
  ],
})
export class ProductModule { }
