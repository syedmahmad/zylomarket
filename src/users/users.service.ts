import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/database/entity/user.entity';


@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async findByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

//   todo dto 
  async createUser(data: any) {
    return this.userModel.create(data);
  }
}
