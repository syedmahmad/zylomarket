  import { NestFactory } from '@nestjs/core';
  import { AppModule } from './app.module';
  import { NestExpressApplication } from '@nestjs/platform-express'; 
  import { join } from 'path';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { addAuditTrailHook } from './database/database.hooks';
// import { AuditedModel } from './audit-trail/audited.model';
// import { AuditTrailService } from './audit-trail/audit-trail.service';

  async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule); 

    app.enableCors({
      origin: ['http://localhost:3001', 'https://ecommerce-store-nine-sigma.vercel.app'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });


    app.useStaticAssets(join(__dirname, '..', 'uploads'), {
      prefix: '/uploads/',
    });

     app.useGlobalInterceptors(new LoggingInterceptor());
    await app.listen(process.env.PORT ?? 3000);

  }
  bootstrap();
