import { Test, TestingModule } from '@nestjs/testing';
import { OurCustomerSectionController } from './our-customer-section.controller';
import { OurCustomerSectionService } from './our-customer-section.service';

describe('OurCustomerSectionController', () => {
  let controller: OurCustomerSectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OurCustomerSectionController],
      providers: [OurCustomerSectionService],
    }).compile();

    controller = module.get<OurCustomerSectionController>(OurCustomerSectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
