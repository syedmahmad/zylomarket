import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SaleProductService } from './sale-product.service';
import { CreateSaleProductDto } from './dto/create-sale-product.dto';
import { UpdateSaleProductDto } from './dto/update-sale-product.dto';

@Controller('sale-product')
export class SaleProductController {
  constructor(private readonly saleProductService: SaleProductService) {}


  @Get()
  async getSaleProducts(@Query('domain') domain: string) {
    return this.saleProductService.getSaleProducts(domain);
  }

}
