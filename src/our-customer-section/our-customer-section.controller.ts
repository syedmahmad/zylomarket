import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OurCustomerSectionService } from './our-customer-section.service';
import { CreateOurCustomerSectionDto } from './dto/create-our-customer-section.dto';
import { UpdateOurCustomerSectionDto } from './dto/update-our-customer-section.dto';

@Controller('our-customer-section')
export class OurCustomerSectionController {
  constructor(private readonly ourCustomerSectionService: OurCustomerSectionService) { }

  @Post()
  create(@Body() createOurCustomerSectionDto: CreateOurCustomerSectionDto) {
    return this.ourCustomerSectionService.create(createOurCustomerSectionDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ourCustomerSectionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOurCustomerSectionDto: UpdateOurCustomerSectionDto) {
    return this.ourCustomerSectionService.update(+id, updateOurCustomerSectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ourCustomerSectionService.remove(+id);
  }

}
