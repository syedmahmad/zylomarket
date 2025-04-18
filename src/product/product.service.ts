import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from 'src/database/entity/product.entity';
import { ProductImage } from 'src/database/entity/product.images.entity';
import { Store } from 'src/database/entity/store.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: typeof Product,
    @Inject('PRODUCT_IMAGE_REPOSITORY')
    private productImageRepository: typeof ProductImage,
    @Inject('STORE_REPOSITORY')
    private storeRepository: typeof Store,
  ) { }

  async create(createProductDto: any, id) {
    const store = await this.storeRepository.findOne({ where: { ownerId: id } });
    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }
    const { imageUrls, ...productData } = createProductDto;
    const product = await this.productRepository.create({
      ...productData,
      storeId: store.dataValues.id,
    });

    if (imageUrls?.length) {
      const imageRecords = imageUrls.map((url) => {
        return ({
          productId: product.dataValues.id,
          imageUrl: url,
        })
      });

      await this.productImageRepository.bulkCreate(imageRecords);
    }

    return product;
  }


  async findAll(id): Promise<Product[]> {
    const store = await this.storeRepository.findOne({
      where: { ownerId: id }
    });
    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }

    return await this.productRepository.findAll({ where: { storeId: store.dataValues.id }, 
      include: { all: true } });
  }




  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findByPk(id, {
      include: { all: true },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    await product.update(updateProductDto);
    return product;
  }

  async remove(id: number): Promise<{ message: string }> {
    const product = await this.findOne(id);
    await product.destroy();
    return { message: `Product with ID ${id} has been removed.` };
  }
}
