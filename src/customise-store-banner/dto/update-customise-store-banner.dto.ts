import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomiseStoreBannerDto } from './create-customise-store-banner.dto';

export class UpdateCustomiseStoreBannerDto extends PartialType(CreateCustomiseStoreBannerDto) {}
