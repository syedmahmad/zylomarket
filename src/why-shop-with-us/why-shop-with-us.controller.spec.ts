import { Test, TestingModule } from '@nestjs/testing';
import { WhyShopWithUsController } from './why-shop-with-us.controller';
import { WhyShopWithUsService } from './why-shop-with-us.service';

describe('WhyShopWithUsController', () => {
  let controller: WhyShopWithUsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WhyShopWithUsController],
      providers: [WhyShopWithUsService],
    }).compile();

    controller = module.get<WhyShopWithUsController>(WhyShopWithUsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
