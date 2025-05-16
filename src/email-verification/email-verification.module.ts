import { Module } from '@nestjs/common';
// import { EmailVerificationService } from './email-verification.service';
import { EmailVerificationController } from './email-verification.controller';
import { EmailService } from './email-verification.service';

@Module({
  controllers: [EmailVerificationController],
  providers: [EmailService],
})
export class EmailVerificationModule {}
