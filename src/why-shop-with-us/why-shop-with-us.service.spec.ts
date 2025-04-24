import { Test, TestingModule } from '@nestjs/testing';
import { WhyShopWithUsService } from './why-shop-with-us.service';

describe('WhyShopWithUsService', () => {
  let service: WhyShopWithUsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WhyShopWithUsService],
    }).compile();

    service = module.get<WhyShopWithUsService>(WhyShopWithUsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
