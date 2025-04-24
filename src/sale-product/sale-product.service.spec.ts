import { Test, TestingModule } from '@nestjs/testing';
import { SaleProductService } from './sale-product.service';

describe('SaleProductService', () => {
  let service: SaleProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaleProductService],
    }).compile();

    service = module.get<SaleProductService>(SaleProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
