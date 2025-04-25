import { Test, TestingModule } from '@nestjs/testing';
import { OurCustomerSectionService } from './our-customer-section.service';

describe('OurCustomerSectionService', () => {
  let service: OurCustomerSectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OurCustomerSectionService],
    }).compile();

    service = module.get<OurCustomerSectionService>(OurCustomerSectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
