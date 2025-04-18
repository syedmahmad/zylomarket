import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import slugify from 'slugify';
import { User } from 'src/database/entity/user.entity';
import { Store } from 'src/database/entity/store.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: typeof User,
    @Inject('STORE_REPOSITORY')
    private storeRepository: typeof Store,
    private jwtService: JwtService,
  ) {}

  async register(name: string, email: string, password: string) {
    console.log('Registering user:', { name, email });

    const existing = await this.usersRepository.findOne({ where: { email } });
    if (existing) throw new Error('User already exists');

    const hashed = await bcrypt.hash(password, 10);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashed,
      provider: 'local',
    } as User);

    await this.createDefaultStoreForUser(user);

    return user;
  }

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
          emailVerified: googleUser.emailVerified ?? true,
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
          emailVerified: googleUser.emailVerified ?? true,
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

    const sanitizedUser = this.sanitizeUser(user);

    return {
      user: sanitizedUser,
      token: this.generateToken(user),
    };
  }

  async login(email: string, password: string) {
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

    const isPasswordValid = await bcrypt.compare(
      password,
      user.dataValues.password,
    );
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

    return {
      id: user.dataValues.id,
      name: user.dataValues.name,
      email: user.dataValues.email,
      provider: user.dataValues.provider,
      profilePic: user.dataValues.profilePic,
      token: this.generateToken(user),
    };
  }

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
   * Creates a default store entry for the user
   */
  private async createDefaultStoreForUser(user: User) {
    console.log('Creating default store for user:', user);
    const domain = `${slugify(user.dataValues.name, { lower: true })}.${process.env.APP_DOMAIN || 'yourplatform.com'}`;
    return this.storeRepository.create({
      name: `${user.dataValues.name}'s Store`,
      description: `Store owned by ${user.dataValues.name}`,
      ownerId: user.id,
      domain,
    }as Store);
  }
}
