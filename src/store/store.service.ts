import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from 'src/database/entity/store.entity';

@Injectable()
export class StoreService {
  constructor(
    @Inject('STORE_REPOSITORY')
    private storeRepository: typeof Store,
  ) {}


  findOne(id: number) {
    const storeInfo = this.storeRepository.findOne({ where: { ownerId: id } });
    if (!storeInfo) {
      throw new BadRequestException(`Store with owner ID ${id} not found.`);
    }
    return storeInfo;
  }

 async update(stores_uuid: any, updateStoreDto: any) {
  const store = await this.storeRepository.findOne({ where: { stores_uuid } });
  if (!store) {
    throw new BadRequestException(`Store with UUID ${stores_uuid} not found.`);
  }

  await store.update({...updateStoreDto,
    logoUrl: updateStoreDto.logoUrl || null
  });
  return store;
}


async deleteStoreLogo(stores_uuid: any) {
  const store = await this.storeRepository.findOne({ where: { stores_uuid } });
  console.log('store',store);
  if (!store) {
    throw new BadRequestException(`Store with UUID ${stores_uuid} not found.`);
  }

   await store.update({
    ...store,
    // @ts-ignore
    logoUrl:  null
  });
  // @ts-ignore
  return { message: 'Logo removed successfully.' };
}


}
