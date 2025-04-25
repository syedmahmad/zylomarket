import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WhyShopWithUsService } from './why-shop-with-us.service';
import { CreateWhyShopWithUsDto } from './dto/create-why-shop-with-us.dto';

@Controller('why-shop-with-us')
export class WhyShopWithUsController {
  constructor(private readonly whyShopWithUsService: WhyShopWithUsService) {}

  @Post()
  create(@Body() createWhyShopWithUsDto: CreateWhyShopWithUsDto) {
    return this.whyShopWithUsService.createOrUpdate(createWhyShopWithUsDto);
  }

  @Get()
  findAll() {
    return this.whyShopWithUsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.whyShopWithUsService.findOne(+id);
  }

}
