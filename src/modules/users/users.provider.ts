import { User } from './users.entity';

export const usersProvider = [
  {
    provide: 'UserRepository',
    useValue: User,
  },
];
