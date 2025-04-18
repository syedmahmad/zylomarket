import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => {
        const host = process.env.DATABASE_HOST || ""
        const port = Number(process.env.DATABASE_PORT) || 5432
        const username = process.env.DATABASE_USERNAME || ""
        const password = process.env.DATABASE_PASSWORD || ""
        const database = process.env.DATABASE_NAME || ""

        console.log('🧪 DB Connection Config:', {
          host,
          port,
          username,
          password: password ? '***' : 'Not Provided',
          database,
        });

        return {
          dialect: 'postgres',
          host,
          port,
          username,
          password,
          database,
          autoLoadModels: true,
          synchronize: true,
          logging: false,
        };
      },
    }),
  ],
})
export class DatabaseModule { }
