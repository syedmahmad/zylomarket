import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, BadRequestException } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService ) {
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeService.findOne(+id);
  }

  @Get('/user/:id')
  findStoreInfoForUserView(@Param('id') id: string) {
    return this.storeService.findStoreInfoForUserView(+id);
  }


  @Patch(':stores_uuid')
  update(@Param('stores_uuid') stores_uuid: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(stores_uuid, updateStoreDto);
  }

  @Delete(':stores_uuid')
  remove(@Param('stores_uuid') stores_uuid: string) {
    return this.storeService.deleteStoreLogo(stores_uuid);
  }
}
