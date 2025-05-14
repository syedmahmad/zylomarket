import { IsString, IsHexColor } from 'class-validator';

export class CreateStoreThemeDto {
  @IsString()
  themeId: string;

  @IsString()
  name: string;

  @IsHexColor()
  primary: string;

  @IsHexColor()
  secondary: string;

  @IsHexColor()
  background: string;

  @IsHexColor()
  text: string;

  @IsHexColor()
  accent: string;

}
