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


  @Get()
  findOne(@Query('id') id: string) {
    return this.customiseStoreBannerService.findOne(+id);
  }

  @Delete('image')
  async deleteImage(@Query('uuid') uuid: string) {
    return this.customiseStoreBannerService.removeImage(uuid);
  }

}
