// dto/request-reset-password.dto.ts
import { IsEmail } from 'class-validator';

export class RequestResetPasswordDto {
  @IsEmail()
  email: string;
}
