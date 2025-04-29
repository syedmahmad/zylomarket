import { User } from "src/database/entity/user.entity";

export const userProvider = [
  {
    provide: 'USER_REPOSITORY',
    useValue: User,
  },
];
