  import { NestFactory } from '@nestjs/core';
  import { AppModule } from './app.module';
  import { NestExpressApplication } from '@nestjs/platform-express'; 
  import { join } from 'path';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

  async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule); 
        app.enableCors({
          origin: (origin, callback) => {
            const allowedOrigins = [
              'http://localhost:3001',
              'https://ecommerce-store-nine-sigma.vercel.app',
              'https://www.zylospace.com',
              'http://www.zylospace.com',
            ];
            
            // Allow all subdomains of zylospace.com
            const regex = /^https?:\/\/([a-z0-9-]+\.)*zylospace\.com$/;

            if (!origin || allowedOrigins.includes(origin) || regex.test(origin)) {
              callback(null, true);
            } else {
              callback(new Error('Not allowed by CORS'));
            }
          },
          credentials: true,
        });

    app.useStaticAssets(join(__dirname, '..', 'uploads'), {
      prefix: '/uploads/',
    });

     app.useGlobalInterceptors(new LoggingInterceptor());
    await app.listen(process.env.PORT ?? 3000);

  }
  bootstrap();
