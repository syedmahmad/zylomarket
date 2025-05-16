import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/database/entity/user.entity';
import { Store } from 'src/database/entity/store.entity';
// import { EmailOtp } from 'src/database/entity/emails-otp';

@Module({
  imports: [SequelizeModule.forFeature([User, Store])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
