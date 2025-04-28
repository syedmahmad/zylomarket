import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { User } from 'src/database/entity/user.entity';
import { Store } from 'src/database/entity/store.entity';
import { Merchant } from 'src/database/entity/merchant.entity';
import { userInfo } from 'os';

@Injectable()
export class MerchantsService {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: typeof User,
    @Inject('STORE_REPOSITORY')
    private storeRepository: typeof Store,
    @Inject('MERCHANT_REPOSITORY')
    private readonly merchantRepository: typeof Merchant,
  ) {}

  // merchants.service.ts
  async findAll() {
    return await this.merchantRepository.findAll({
      include: { all: true },
    });
  }
}
