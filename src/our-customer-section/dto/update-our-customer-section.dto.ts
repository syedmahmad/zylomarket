import { PartialType } from '@nestjs/mapped-types';
import { CreateOurCustomerSectionDto } from './create-our-customer-section.dto';

export class UpdateOurCustomerSectionDto extends PartialType(CreateOurCustomerSectionDto) {}
