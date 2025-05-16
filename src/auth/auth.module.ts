import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { userProvider } from './providers/user.provider';
import { JwtModule } from '@nestjs/jwt';
import { storeProvider } from './providers/store.provider';
import { merchantProvider } from './providers/merchant.provider';
import { EmailService } from 'src/email-verification/email-verification.service';


@Module({
  imports: [
    JwtModule.register({
      secret: "3a92d1827de63978e55f6c0d2a9f26942343c07e2b96d25260c8574f79499b88", // Load from env or ConfigService
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, EmailService,
    ...userProvider,
    ...storeProvider,
    ...merchantProvider
  ],
  exports: ['USER_REPOSITORY'],
})
export class AuthModule {}


