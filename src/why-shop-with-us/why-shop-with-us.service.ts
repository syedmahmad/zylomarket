import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWhyShopWithUsDto } from './dto/create-why-shop-with-us.dto';
import { UpdateWhyShopWithUsDto } from './dto/update-why-shop-with-us.dto';
import { WhyShopSection } from 'src/database/entity/why-shop-with-us.entity';
import { WhyShopFeature } from 'src/database/entity/why-shop-feature.entity';
import { Sequelize } from 'sequelize-typescript';
import { Store } from 'src/database/entity/store.entity';

@Injectable()
export class WhyShopWithUsService {
  constructor(
    @Inject('WHY_SHOP_WITH_US_REPOSITORY')
    private readonly whyShopWithUsRepository: typeof WhyShopSection,

    @Inject('WHY_SHOP_FEATURE_REPOSITORY')
    private readonly whyShopFeaturesRepository: typeof WhyShopFeature,

    @Inject('STORE_REPOSITORY')
    private readonly storeRepository: typeof Store,

  ) { }

  async createOrUpdate(dto: any) {
    const { userId, sectionTitle, description, features = [] } = dto;
  
    // Step 1: Validate store existence
    const store = await this.storeRepository.findOne({ where: { ownerId: userId } });
    if (!store?.dataValues?.id) {
      throw new NotFoundException(`Store with owner ID ${userId} not found.`);
    }
  
    const storeId = store.dataValues.id;
  
    // Step 2: Check if a section already exists for this store
    let section = await this.whyShopWithUsRepository.findOne({ where: { storeId } });
  
    if (section) {
      // Step 3a: Update existing section
      await section.update({ sectionTitle, description });
    } else {
      // Step 3b: Create new section
      section = await this.whyShopWithUsRepository.create({
        sectionTitle,
        description,
        storeId,
      } as WhyShopSection);
    }
  
    // Step 4: Upsert features (simplest approach is delete & insert fresh)
    if (features.length) {
      await this.whyShopFeaturesRepository.destroy({ where: { sectionId: section.id } });
  
      const newFeatures = features.map((feature) => ({
        ...feature,
        sectionId: section.id,
      }));
  
      await this.whyShopFeaturesRepository.bulkCreate(newFeatures);
    }
  
    // Step 5: Return updated section with details
    const sectionDetails = await this.whyShopWithUsRepository.findByPk(section.id);
    if (!sectionDetails) {
      throw new NotFoundException(`Section with ID ${section.id} not found.`);
    }
  
    return sectionDetails;
  }
  
  

  async findAll() {
    return this.whyShopWithUsRepository.findAll({
      include: [WhyShopFeature],
    });
  }

  async findOne(id: number) {


    // const store = await this.storeRepository.findOne({ where: { ownerId: id } });


    // if (!store) {
    //   throw new NotFoundException(`Store with owner ID ${id} not found.`);
    // }
    const section = await this.whyShopWithUsRepository.findOne({
      where: { storeId: id},
      include: [WhyShopFeature],
    });

    if (!section) {
      return []
    };

    return section;
  }

}
