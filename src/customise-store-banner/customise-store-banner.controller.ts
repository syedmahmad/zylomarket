import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CustomiseStoreBannerService } from './customise-store-banner.service';
import { CreateCustomiseStoreBannerDto } from './dto/create-customise-store-banner.dto';
// import { UpdateCustomiseStoreBannerDto } from './dto/update-customise-store-banner.dto';

@Controller('customise-store-banner')
export class CustomiseStoreBannerController {
  constructor(private readonly customiseStoreBannerService: CustomiseStoreBannerService) { }

  @Post()
  create(
    @Query('id') id: string,
    @Body() createCustomiseStoreBannerDto: CreateCustomiseStoreBannerDto,
  ) {
    return this.customiseStoreBannerService.create(+id, createCustomiseStoreBannerDto);
  }


  // @Get()
  // findAll() {
  //   return this.customiseStoreBannerService.findAll();
  // }

  @Get()
  findOne(@Query('id') id: string) {
    return this.customiseStoreBannerService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCustomiseStoreBannerDto: UpdateCustomiseStoreBannerDto) {
  //   return this.customiseStoreBannerService.update(+id, updateCustomiseStoreBannerDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.customiseStoreBannerService.remove(+id);
  // }
}
