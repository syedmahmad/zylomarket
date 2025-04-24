import { Test, TestingModule } from '@nestjs/testing';
import { CustomiseStoreBannerService } from './customise-store-banner.service';

describe('CustomiseStoreBannerService', () => {
  let service: CustomiseStoreBannerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomiseStoreBannerService],
    }).compile();

    service = module.get<CustomiseStoreBannerService>(CustomiseStoreBannerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
