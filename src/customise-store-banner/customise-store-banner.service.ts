import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CustomiseStoreBanner } from 'src/database/entity/customise-store-banner.entity';
import { Store } from 'src/database/entity/store.entity';
import { User } from 'src/database/entity/user.entity';

@Injectable()
export class CustomiseStoreBannerService {
  constructor(
    @Inject('CUSTOMISE_STORE_BANNER_REPOSITORY')
    private readonly bannerModel: typeof CustomiseStoreBanner, 
    @Inject('STORE_REPOSITORY')
    private readonly storeRepository: typeof Store,
    @Inject('USER_REPOSITORY')
    private readonly userRepository: typeof User

  ) { }

  async create(id: number, dto: any) {


    const userInfo = await this.userRepository.findByPk(id);

    if(!userInfo) {
        throw new NotFoundException(`Failed to find user info with id: ${id}`);
    }

    const userId = userInfo.dataValues?.users_uuid;

    const store = await this.storeRepository.findOne({
      where: { ownerId: id },
    });

    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }

    // Check if a banner already exists for this store
    const existingBanner = await this.bannerModel.findOne({
      where: { storeId: store.id },
    });

    if (existingBanner) {
      // Update the existing banner
      await existingBanner.update({
        title: dto.storeBannerTitle,
        description: dto.storeBannerDescription,
        imageUrl: dto.storeBannerImageUrl, // Make sure the key matches frontend
        buttonText: dto.storeBannerButtonText,
      },{
      context: { userId },
      individualHooks: true,
    } as any,
);

      return existingBanner; // Return the updated banner
    }

    // No existing banner, create a new one
    return this.bannerModel.create({
      storeId: store.id,
      title: dto.storeBannerTitle,
      description: dto.storeBannerDescription,
      imageUrl: dto.storeBannerImageUrl,
      buttonText: dto.storeBannerButtonText,
    } as CustomiseStoreBanner,
  {
      context: { userId },
      individualHooks: true,
    } as any,

  );
  }


  async findOne(domain: string) {

    const storeDomain = domain.concat('.zylospace.com');
    const store = await this.storeRepository.findOne({
      where: { domain: storeDomain },
    });


    if (!store) {
      throw new NotFoundException(`Store with ID ${storeDomain} not found`);
    }


    const banner = await this.bannerModel.findOne({where: { storeId: store.dataValues.id }});
    if (!banner) [];
    return banner;
  }

  async removeImage(uuid: string, userId: string): Promise<{ message: string }> {
  const banner = await this.bannerModel.findOne({
    where: { customise_banner_uuid: uuid },
  });

  if (!banner) {
    throw new NotFoundException('Banner not found');
  }

  const oldImageUrl = banner.imageUrl;

  await this.bannerModel.update(
    // @ts-ignore
    { imageUrl: null },
    {
      where: { customise_banner_uuid: uuid },
      context: { userId },
      individualHooks: true,
    } as any // If your Sequelize typings don't accept `context`, cast to `any`
  );

  return { message: 'Image URL removed from banner successfully' };
}
}
