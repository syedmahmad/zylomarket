import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreThemeDto } from './create-store-theme.dto';

export class UpdateStoreThemeDto extends PartialType(CreateStoreThemeDto) {}
