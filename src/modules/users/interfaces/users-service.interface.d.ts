import { User } from '../users.entity';
import { IUser } from './users.interface';

export interface IUserService {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  findOne(options: Object): Promise<User | null>;
  create(user: IUser): Promise<User>;
  update(id: number, newValue: IUser): Promise<User | null>;
  delete(id: number): Promise<void>;
}
