import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { StoreThemeService } from './store-theme.service';
import { CreateStoreThemeDto } from './dto/create-store-theme.dto';
import { UpdateStoreThemeDto } from './dto/update-store-theme.dto';

@Controller('store-theme')
export class StoreThemeController {
  constructor(private readonly storeThemeService: StoreThemeService) {}

  /**
   * Create a new theme for the user's store
   * Expects userId in the request body
   */
  @Post(':id')
  async create(@Param('id') id: string,
   @Body() createStoreThemeDto: CreateStoreThemeDto ) {
    const { ...dto } = createStoreThemeDto;

    return this.storeThemeService.create(dto, +id);
  }

  /**
   * Get the theme by storeId
   */
  @Get(':storeId')
  async findByStore(@Param('storeId') storeId: string) {
    return this.storeThemeService.findByStore(+storeId);
  }

  /**
   * Update a store's theme by storeId
   */
  @Patch(':storeId')
  async update(
    @Param('storeId') storeId: string,
    @Body() updateStoreThemeDto: UpdateStoreThemeDto,
  ) {
    return this.storeThemeService.update(+storeId, updateStoreThemeDto);
  }

  /**
   * Delete a store theme by storeId
   */
  // @Delete(':storeId')
  // async remove(@Param('storeId') storeId: string) {
  //   return this.storeThemeService.remove(+storeId);
  // }
}
