import { Test, TestingModule } from '@nestjs/testing';
import { SaleProductController } from './sale-product.controller';
import { SaleProductService } from './sale-product.service';

describe('SaleProductController', () => {
  let controller: SaleProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaleProductController],
      providers: [SaleProductService],
    }).compile();

    controller = module.get<SaleProductController>(SaleProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
