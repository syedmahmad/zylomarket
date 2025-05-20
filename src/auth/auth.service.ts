import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,

} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import slugify from 'slugify';
import { User } from 'src/database/entity/user.entity';
import { Store } from 'src/database/entity/store.entity';
import { Merchant } from 'src/database/entity/merchant.entity';
import { EmailService } from 'src/email-verification/email-verification.service';
import { ConflictException } from '@nestjs/common';



@Injectable()
export class AuthService {
    private readonly OTP_EXPIRY_MINUTES = 5;

  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: typeof User,
    @Inject('STORE_REPOSITORY')
    private storeRepository: typeof Store,
    @Inject('MERCHANT_REPOSITORY')
    private readonly merchantRepository: typeof Merchant,
    private jwtService: JwtService,
    // injecting the email service...
    private emailService: EmailService,

  ) {}


   private generateOTP(): string {
    return crypto.randomInt(100000, 999999).toString();
  }

  private async sendAndSaveOTP(user: User): Promise<void> {
    const otp = this.generateOTP();
    const otpExpiresAt = new Date();
    otpExpiresAt.setMinutes(otpExpiresAt.getMinutes() + this.OTP_EXPIRY_MINUTES);

    console.log('Sending OTP to:', user);
    console.log('user',user.dataValues.email)
    await user.update({
      otpCode: await bcrypt.hash(otp, 10), // Hash the OTP before storing
      otpExpiresAt,
      emailVerified: false,
    });

    await this.emailService.sendOTP(user.dataValues.email, otp);
  }


  async register(name: string, email: string, password: string) {

    const existing = await this.usersRepository.findOne({ where: { email } });
    if (existing) throw new ConflictException('User with this email already exists');

    
    const hashed = await bcrypt.hash(password, 10);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashed,
      provider: 'local',
    } as User);

    await this.sendAndSaveOTP(user);


    const storeInfo = await this.createDefaultStoreForUser(user);

    await this.insertInfoInMerchantTable(user, storeInfo)

    // return user;
    return {
  message: 'OTP sent to email',
  email: user.email,
  nextStep: 'verify-otp',
}

  }

// #new code region
  async verifyEmail(email: string, otp: string): Promise<{ user: any; token: string }> {
    const user = await this.usersRepository.findOne({ where: { email } });

    
    if (!user) {
      throw new Error('User not found');
    }

    if (user.emailVerified) {
      throw new Error('Email already verified');
    }

    console.log("User found:", {
  email: user.dataValues.email,
  otpCode: user.dataValues.otpCode,
  otpExpiresAt: user.dataValues.otpExpiresAt,
});


    if (!user.dataValues.otpCode || !user.dataValues.otpExpiresAt) {
      throw new Error('OTP not requested or expired');
    }

    if (new Date() > user.dataValues.otpExpiresAt) {
      throw new Error('OTP expired');
    }

    const isOtpValid = await bcrypt.compare(otp, user.dataValues.otpCode);
    if (!isOtpValid) {
      throw new Error('Invalid OTP');
    }

    // Clear OTP fields and mark as verified
    await user.update({
      // @ts-ignore
      otpCode: null,
      // @ts-ignore
      otpExpiresAt: null,
      emailVerified: true,
    });

    return {
      user: this.sanitizeUser(user),
      token: this.generateToken(user),
    };
  }

  async resendOTP(email: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    if (user.emailVerified) {
      throw new Error('Email already verified');
    }

    await this.sendAndSaveOTP(user);
  }

  // Update your login method to check for email verification
  async login(email: string, password: string) {
    console.log("Login attempt with email:", email);
    console.log("Login attempt with password:", password);
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'User not found',
          code: 'USER_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.dataValues.password);
    console.log("Password check:",isPasswordValid)
    if (!isPasswordValid) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'Invalid password',
          code: 'INVALID_PASSWORD',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!user.dataValues.emailVerified) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          message: 'Email not verified',
          code: 'EMAIL_NOT_VERIFIED',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    return {
      id: user.dataValues.id,
      name: user.dataValues.name,
      email: user.dataValues.email,
      provider: user.dataValues.provider,
      profilePic: user.dataValues.profilePic,
      token: this.generateToken(user),
    };
  }

  //  async login(email: string, password: string) {
  //   const user = await this.usersRepository.findOne({ where: { email } });

  //   if (!user) {
  //     throw new HttpException(
  //       {
  //         status: HttpStatus.NOT_FOUND,
  //         message: 'User not found',
  //         code: 'USER_NOT_FOUND',
  //       },
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }

  //   const isPasswordValid = await bcrypt.compare(
  //     password,
  //     user.dataValues.password,
  //   );
  //   if (!isPasswordValid) {
  //     throw new HttpException(
  //       {
  //         status: HttpStatus.UNAUTHORIZED,
  //         message: 'Invalid password',
  //         code: 'INVALID_PASSWORD',
  //       },
  //       HttpStatus.UNAUTHORIZED,
  //     );
  //   }

  //   return {
  //     id: user.dataValues.id,
  //     name: user.dataValues.name,
  //     email: user.dataValues.email,
  //     provider: user.dataValues.provider,
  //     profilePic: user.dataValues.profilePic,
  //     token: this.generateToken(user),
  //   };
  // }
// #endregion
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user.toJSON();
      return result;
    }
    return null;
  }

  async handleGoogleAuth(googleUser: any) {
    let user = await this.usersRepository.findOne({
      where: { googleId: googleUser.googleId },
    });

    if (!user) {
      user = await this.usersRepository.findOne({
        where: { email: googleUser.email },
      });

      if (user) {
        if (user.provider === 'local') {
          console.warn(
            `User with email ${googleUser.email} is being linked to Google provider.`,
          );
        }

        user = await user.update({
          googleId: googleUser.googleId,
          provider: 'google',
          profilePic: googleUser.profilePic,
          // emailVerified: googleUser.emailVerified ?? true,
        });
      } else {
        const randomPassword = await bcrypt.hash(
          Math.random().toString(36).slice(-8),
          10,
        );

        user = await this.usersRepository.create({
          googleId: googleUser.googleId,
          email: googleUser.email,
          name: googleUser.name,
          firstName: googleUser.firstName,
          lastName: googleUser.lastName,
          profilePic: googleUser.profilePic,
          provider: 'google',
          // emailVerified: googleUser.emailVerified ?? true,
          password: randomPassword,
        } as User);
      }
    }

    // Create store if not exists
    const existingStore = await this.storeRepository.findOne({
      where: { ownerId: user.id },
    });
    if (!existingStore) {
      await this.createDefaultStoreForUser(user);
    }
    const storeInfo = await this.storeRepository.findOne({ where: { ownerId: user.id } });
    if(!storeInfo) {
      console.log(`No store found for user with id ${user.id}`);
      return; }
    await this.insertInfoInMerchantTable(user, storeInfo);

    const sanitizedUser = this.sanitizeUser(user);


    return {
      user: sanitizedUser,
      token: this.generateToken(user),
    };
  }

  // old login method which is workign fine 
 

  private sanitizeUser(user: User) {
    const { password, ...safeUser } = user.toJSON();
    return safeUser;
  }

  private generateToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      provider: user.provider,
    };

    return this.jwtService.sign(payload);
  }

/**
 * create entry in merchant table as user will be created we will be adding user id and store id in the merchant table.
 * for later use.
 */

private async insertInfoInMerchantTable (user: User, store: Store) {
  return this.merchantRepository.create({
    userId: user.id,
    storeId: store.id,
    totalSalesCount: 0,
    totalSalesValue: 0,
    totalProductsSold: 0,
  }as Merchant)
}






  /**
   * Creates a default store entry for the user
   */
  private async createDefaultStoreForUser(user: User) {
    const domain = `${slugify(user.dataValues.name, { lower: true })}.${process.env.APP_DOMAIN || 'yourplatform.com'}`;
    return this.storeRepository.create({
      name: `${user.dataValues.name}'s Store`,
      description: `Store owned by ${user.dataValues.name}`,
      ownerId: user.id,
      domain,
    }as Store);
  }
}


