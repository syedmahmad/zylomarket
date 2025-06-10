import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWhyShopWithUsDto } from './dto/create-why-shop-with-us.dto';
import { UpdateWhyShopWithUsDto } from './dto/update-why-shop-with-us.dto';
import { WhyShopSection } from 'src/database/entity/why-shop-with-us.entity';
import { WhyShopFeature } from 'src/database/entity/why-shop-feature.entity';
import { Sequelize } from 'sequelize-typescript';
import { Store } from 'src/database/entity/store.entity';
import { UpdateVisibilityDto } from './dto/UpdateVisibilityDto';

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
    const { userId, sectionTitle, description, features = [], uuid } = dto;
    console.log('userId',userId)
  
    // Validate store existence
    const store = await this.storeRepository.findOne({ where: { ownerId: userId } });
    if (!store?.dataValues?.id) {
      throw new NotFoundException(`Store with owner ID ${userId} not found.`);
    }
  
    const storeId = store.dataValues.id;
  
    // Check if section exists
    let section: any = await this.whyShopWithUsRepository.findOne({ 
      where: { storeId },
      include: [WhyShopFeature]
    });
  
    if (section) {
      // Update existing section
      await section.update({ sectionTitle, description }, {
        context: { userId: uuid },
        individualHooks: true,
      } as any);
    } else {
      // Create new section
      section = await this.whyShopWithUsRepository.create({
        sectionTitle,
        description,
        storeId,
      } as WhyShopSection, {
        context: { userId },
        individualHooks: true,
      } as any);
    }
  
    // Handle features with icon URLs from frontend
    if (features.length) {
      // Delete existing features
      await this.whyShopFeaturesRepository.destroy({ where: { sectionId: section.id } });
  
      // Create new features with icon URLs
      const newFeatures = features.map(feature => ({
        title: feature.title,
        description: feature.description,
        icon: feature.icon || null, // Use the URL provided by frontend
        sectionId: section.id,
      }));
  
      await this.whyShopFeaturesRepository.bulkCreate(newFeatures);
    }
  
    // Return updated section with features
    const sectionDetails = await this.whyShopWithUsRepository.findByPk(section.id, {
      include: [WhyShopFeature],
    });
    
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
    const section = await this.whyShopWithUsRepository.findOne({
      where: { storeId: id},
      include: [WhyShopFeature],
    });

    if (!section) {
      return []
    };

    return section;
  }


  async updateVisibility(id: number, updateVisibilityDto: UpdateVisibilityDto) {
  const record = await this.whyShopWithUsRepository.findOne({
      where: { storeId: id},
    });

  const updatedRecord = await record?.update({ showOnUI: updateVisibilityDto.showOnUI });

  return { message: 'Visibility updated successfully', data: updatedRecord };
}

}
