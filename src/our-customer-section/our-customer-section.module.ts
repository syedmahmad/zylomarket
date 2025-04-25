import { Module } from '@nestjs/common';
import { OurCustomerSectionService } from './our-customer-section.service';
import { OurCustomerSectionController } from './our-customer-section.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Testimonial } from 'src/database/entity/ourCustomer.entity';
import { ourCustomerProvider } from './provider/customer.provider';
import { storeProvider } from './provider/store.provider';

@Module({
  imports: [SequelizeModule.forFeature([Testimonial])],
  controllers: [OurCustomerSectionController],
  providers: [OurCustomerSectionService,
    ...ourCustomerProvider,
    ...storeProvider
  ],
})
export class OurCustomerSectionModule { }

