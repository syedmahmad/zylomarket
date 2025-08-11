import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CustomiseStoreBannerService } from './customise-store-banner.service';
import { CreateCustomiseStoreBannerDto } from './dto/create-customise-store-banner.dto';
import { AuthGuard } from '@nestjs/passport';
// import { UpdateCustomiseStoreBannerDto } from './dto/update-customise-store-banner.dto';

@Controller('customise-store-banner')
export class CustomiseStoreBannerController {
  constructor(private readonly customiseStoreBannerService: CustomiseStoreBannerService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Query('id') id: string,
    @Body() createCustomiseStoreBannerDto: CreateCustomiseStoreBannerDto,
  ) {
    return this.customiseStoreBannerService.create(+id, createCustomiseStoreBannerDto);
  }


  @Get()
  findOne(@Query('domain') domain: string) {
    return this.customiseStoreBannerService.findOne(domain);
  }

  @Delete('image')
  @UseGuards(AuthGuard('jwt'))
  async deleteImage(@Query('uuid') uuid: string, @Query('userId') userId: string) {
    return this.customiseStoreBannerService.removeImage(uuid,userId);
  }

}
