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
    private readonly userRepository: typeof User,
  ) {}

  async create(uuid: string, dto: any) {
    const userInfo: any = await this.userRepository.findOne({
      where: { users_uuid: uuid },
    });

    if (!userInfo) {
      throw new NotFoundException(`Failed to find user info with id: ${uuid}`);
    }

    const userId = userInfo?.users_uuid;

    const store: any = await this.storeRepository.findOne({
      where: { ownerId: userInfo.id },
    });

    if (!store) {
      throw new NotFoundException(
        `Store with ownerId ${userInfo.id} not found`,
      );
    }

    const existingBanner = await this.bannerModel.findOne({
      where: { storeId: store.id },
    });

    if (existingBanner) {
      await existingBanner.update(
        {
          title: dto.storeBannerTitle,
          description: dto.storeBannerDescription,
          imageUrl: dto.storeBannerImageUrl,
          buttonText: dto.storeBannerButtonText,
        },
        {
          context: { userId },
          individualHooks: true,
        } as any,
      );

      return existingBanner;
    }

    return this.bannerModel.create(
      {
        storeId: store.id,
        title: dto.storeBannerTitle,
        description: dto.storeBannerDescription,
        imageUrl: dto.storeBannerImageUrl,
        buttonText: dto.storeBannerButtonText,
      } as CustomiseStoreBanner,
      {
        context: { userId }, // ✅ now UUID
        individualHooks: true,
      } as any,
    );
  }

  async findOneForAdmin(id: string) {
    const store = await this.storeRepository.findOne({
      where: { ownerId: id },
    });

    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }

    const banner = await this.bannerModel.findOne({
      where: { storeId: store.dataValues.id },
    });
    if (!banner) [];
    return banner;
  }

  async findOne(domain: string) {
    if (!domain) {
      throw new NotFoundException(`Domain is required`);
    }
    const storeDomain = domain.concat('.zylospace.com');
    const store = await this.storeRepository.findOne({
      where: { domain: storeDomain },
    });

    if (!store) {
      throw new NotFoundException(`Store with ID ${storeDomain} not found`);
    }

    const banner = await this.bannerModel.findOne({
      where: { storeId: store.dataValues.id },
    });
    if (!banner) [];
    return banner;
  }

  async removeImage(
    uuid: string,
    userId: string,
  ): Promise<{ message: string }> {
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
      } as any, // If your Sequelize typings don't accept `context`, cast to `any`
    );

    return { message: 'Image URL removed from banner successfully' };
  }
}
