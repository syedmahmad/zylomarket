import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateStoreThemeDto } from './dto/create-store-theme.dto';
import { UpdateStoreThemeDto } from './dto/update-store-theme.dto';
import { StoreTheme } from 'src/database/entity/storeTheme.entity';
import { Store } from 'src/database/entity/store.entity'; // Assuming Store entity exists

@Injectable()
export class StoreThemeService {
  constructor(
    @Inject('STORE_THEME_REPOSITORY')
    private storeThemeModelRepository: typeof StoreTheme,

    @Inject('STORE_REPOSITORY')
    private storeRepository: typeof Store, // corrected entity
  ) {}

  /**
   * Creates a new theme for the store owned by the user
   * @param createDto DTO with theme data (no storeId needed)
   * @param userId The owner of the store
   */
 async create(createDto: any, userId: number): Promise<StoreTheme> {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    const store = await this.storeRepository.findOne({ where: { ownerId: userId } });
    if (!store) {
      throw new NotFoundException('Store not found for this user');
    }

    // Upsert (update if exists, otherwise create)
    const [theme, created] = await this.storeThemeModelRepository.upsert({
      ...createDto,
      storeId: store.id,
    });

    return theme;
  }

  /**
   * Updates the theme of a specific store
   * @param storeId 
   * @param updateDto 
   */
  async update(storeId: number, updateDto: UpdateStoreThemeDto): Promise<StoreTheme> {
    const theme = await this.storeThemeModelRepository.findOne({ where: { storeId } });

    if (!theme) {
      throw new NotFoundException('Theme not found for this store');
    }

    await theme.update(updateDto);
    return theme;
  }

  /**
   * Finds the theme by store ID
   * @param storeId 
   */
  async findByStore(domain: string): Promise<StoreTheme> {



    const storDomain = domain.concat('.zylospace.com');
    const store = await this.storeRepository.findOne({ where: { domain: storDomain } });
    if (!store) {
      throw new NotFoundException('Store not found for this user');
    }


    const theme = await this.storeThemeModelRepository.findOne({ where: { storeId: store.dataValues.id } });

    const defaultThemeValue: any = {
    themeId: "light",
    name: "Light",
    primary: "#4f46e5", // Indigo-600
    secondary: "#f9fafb", // Gray-50
    background: "#ffffff", // White
    text: "#111827", // Gray-900
    accent: "#f97316", // Orange-500
  }
    if (!theme) {
      return defaultThemeValue
    }

    return theme;
  }
}
