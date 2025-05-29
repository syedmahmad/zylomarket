
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { userProvider } from './providers/user.provider';
import { storeProvider } from './providers/store.provider';
import { merchantProvider } from './providers/merchant.provider';
import { EmailService } from 'src/email-verification/email-verification.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy'; // Make sure path is correct
import { ConfigModule, ConfigService } from '@nestjs/config';


// @Module({
//   imports: [
//     JwtModule.register({
//       secret: process.env.JWT_SECRET, // Load from env or ConfigService
//       signOptions: { expiresIn: '1d' },
//     }),
//   ],
//   controllers: [AuthController],
//   providers: [AuthService, EmailService,
//     ...userProvider,
//     ...storeProvider,
//     ...merchantProvider
//   ],
//   exports: ['USER_REPOSITORY'],
// })
// export class AuthModule {}





@Module({
  imports: [
    ConfigModule, // Load .env
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    EmailService,
    JwtStrategy,
    ...userProvider,
    ...storeProvider,
    ...merchantProvider,
  ],
  exports: ['USER_REPOSITORY'],
})
export class AuthModule {}
