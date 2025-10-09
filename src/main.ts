import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) {
        // Allow non-browser requests like Postman or server-to-server
        return callback(null, true);
      }

      const allowed = [
        'https://zylospace.com',
        'https://www.zylospace.com',
        'http://localhost:3000',
        'http://localhost:3001',
      ];

      // Allow any subdomain of zylospace.com
      const regex = /^https?:\/\/([a-z0-9-]+)\.zylospace\.com$/i;

      if (allowed.includes(origin) || regex.test(origin)) {
        callback(null, true);
      } else {
        callback(
          new Error('CORS not allowed for this origin: ' + origin),
          false,
        );
      }
    },
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
