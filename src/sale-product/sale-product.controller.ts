import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SaleProductService } from './sale-product.service';
import { CreateSaleProductDto } from './dto/create-sale-product.dto';
import { UpdateSaleProductDto } from './dto/update-sale-product.dto';

@Controller('sale-product')
export class SaleProductController {
  constructor(private readonly saleProductService: SaleProductService) {}


  @Get()
  async getSaleProducts(@Query('id') id: string) {
    return this.saleProductService.getSaleProducts(+id);
  }
  
  
  // @Post()
  // create(@Body() createSaleProductDto: CreateSaleProductDto) {
  //   return this.saleProductService.create(createSaleProductDto);
  // }

  

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.saleProductService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSaleProductDto: UpdateSaleProductDto) {
  //   return this.saleProductService.update(+id, updateSaleProductDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.saleProductService.remove(+id);
  // }
}
