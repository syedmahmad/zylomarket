import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OAuth2Client } from 'google-auth-library';
import { RegisterDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  private googleClient: OAuth2Client;

  constructor(private authService: AuthService) {
    this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.login(body.email, body.password);
    return user;
  }


  @Post('register')
  async register(
    @Body() body: RegisterDto,
  ) {
    console.log('body', body)
    return this.authService.register(body.name, body.email, body.password);
  }

  @Post('google')
  async googleAuth(@Body() body: { credential: string }) {
    console.log('Google Auth Body:', body);
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken: body.credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      if (!payload) {
        throw new Error('Invalid Google token');
      }
      const userData = {
        googleId: payload.sub,
        email: payload.email,
        name: payload.name || `${payload.given_name} ${payload.family_name}`,
        firstName: payload.given_name,
        lastName: payload.family_name,
        profilePic: payload.picture,
        provider: 'google',
        emailVerified: payload.email_verified || false
      };

      return this.authService.handleGoogleAuth(userData);
    } catch (error) {
      throw new Error('Google authentication failed: ' + error.message);
    }
  }
}