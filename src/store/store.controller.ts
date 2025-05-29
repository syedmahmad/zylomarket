import { Controller, Get, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StoreService } from './store.service';;
import { UpdateStoreDto } from './dto/update-store.dto';
import { AuthGuard } from '@nestjs/passport';

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
  @UseGuards(AuthGuard('jwt'))
  update(@Param('stores_uuid') stores_uuid: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(stores_uuid, updateStoreDto);
  }

  @Delete(':stores_uuid')
   @UseGuards(AuthGuard('jwt'))
  remove(@Param('stores_uuid') stores_uuid: string) {
    return this.storeService.deleteStoreLogo(stores_uuid);
  }
}
