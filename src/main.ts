  import { NestFactory } from '@nestjs/core';
  import { AppModule } from './app.module';
  import { NestExpressApplication } from '@nestjs/platform-express'; 
  import { join } from 'path';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

  async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule); 
    app.enableCors({
      origin: true,
      credentials: true,
    });

    app.useStaticAssets(join(__dirname, '..', 'uploads'), {
      prefix: '/uploads/',
    });

     app.useGlobalInterceptors(new LoggingInterceptor());
    await app.listen(process.env.PORT ?? 3000);

  }
  bootstrap();
