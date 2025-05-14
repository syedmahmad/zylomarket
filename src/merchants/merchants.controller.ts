import {
  Controller,
  Get
} from '@nestjs/common';
import { MerchantsService } from './merchants.service';

@Controller('merchants')
export class MerchantsController {
  constructor(private readonly merchantsService: MerchantsService) {}

  @Get()
  async findAll() {
    return await this.merchantsService.findAll();
  }
}
