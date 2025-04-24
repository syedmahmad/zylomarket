import { Test, TestingModule } from '@nestjs/testing';
import { CustomiseStoreBannerController } from './customise-store-banner.controller';
import { CustomiseStoreBannerService } from './customise-store-banner.service';

describe('CustomiseStoreBannerController', () => {
  let controller: CustomiseStoreBannerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomiseStoreBannerController],
      providers: [CustomiseStoreBannerService],
    }).compile();

    controller = module.get<CustomiseStoreBannerController>(CustomiseStoreBannerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
