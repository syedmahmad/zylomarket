import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Store } from 'src/database/entity/store.entity';
import { User } from 'src/database/entity/user.entity';

@Injectable()
export class StoreService {
  constructor(
    @Inject('STORE_REPOSITORY')
    private storeRepository: typeof Store,

    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
  ) {}

  
 async findOne(id: number) {
  const storeInfo = await this.storeRepository.findOne({
    where: { ownerId: id },
    include: [
      {
        model: this.userRepository,
        as: 'owner', // must match alias in association
      },
    ],
  });

  if (!storeInfo) {
    throw new BadRequestException(`Store with owner ID ${id} not found.`);
  }

  return storeInfo; // now includes storeInfo.owner
}



 async findStoreInfoForUserView(id: number) {
  const storeInfo = await this.storeRepository.findOne({
    where: { id: id }
  });

  if (!storeInfo) {
    throw new BadRequestException(`Store with owner ID ${id} not found.`);
  }

  return storeInfo; // now includes storeInfo.owner
}



 async update(stores_uuid: any, updateStoreDto: any) {
  const store = await this.storeRepository.findOne({ where: { stores_uuid } });
  if (!store) {
    throw new BadRequestException(`Store with UUID ${stores_uuid} not found.`);
  }

    // Get user info from User table using ownerId
  const userInfo = await this.userRepository.findByPk(store.ownerId);
  if (!userInfo) {
    throw new BadRequestException(`User with ID ${store.ownerId} not found.`);
  }

  const userId = userInfo.dataValues?.users_uuid;


  // await store.update({...updateStoreDto,
  //   logoUrl: updateStoreDto.logoUrl || null
  // });

    await store.update(
    {
      ...updateStoreDto,
      logoUrl: updateStoreDto.logoUrl || null,
    },
    {
      context: { userId },
      individualHooks: true,
    } as any,
  );

  return store;
}


async deleteStoreLogo(stores_uuid: any) {
  const store = await this.storeRepository.findOne({ where: { stores_uuid } });

  if (!store) {
    throw new BadRequestException(`Store with UUID ${stores_uuid} not found.`);
  }

   const userInfo = await this.userRepository.findByPk(store.ownerId);
  if (!userInfo) {
    throw new BadRequestException(`User with ID ${store.ownerId} not found.`);
  }

  const userId = userInfo.dataValues?.users_uuid;


   await store.update({
    ...store,
    // @ts-ignore
    logoUrl:  null
  } as any,
{
      context: { userId },
      individualHooks: true,
    } as any
  );
  // @ts-ignore
  return { message: 'Logo removed successfully.' };
}




}
