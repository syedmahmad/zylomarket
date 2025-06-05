import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WhyShopWithUsService } from './why-shop-with-us.service';
import { CreateWhyShopWithUsDto } from './dto/create-why-shop-with-us.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateVisibilityDto } from './dto/UpdateVisibilityDto';

@Controller('why-shop-with-us')
export class WhyShopWithUsController {
  constructor(private readonly whyShopWithUsService: WhyShopWithUsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
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

@Patch('visibility/:id')
@UseGuards(AuthGuard('jwt'))
updateVisibility(
  @Param('id') id: string,
  @Body() updateVisibilityDto: UpdateVisibilityDto,
) {
  return this.whyShopWithUsService.updateVisibility(+id, updateVisibilityDto);
}

}
