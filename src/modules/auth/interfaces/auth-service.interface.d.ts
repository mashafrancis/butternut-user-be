import { IUser } from '../../users/interfaces';
import { User } from '../../users/users.entity';

export interface IAuthService {
  options: IJwtOptions;
  login(credentials: LoginDTO): Promise<{user: IUser, token: string} | undefined>;
  register(userData: RegisterDTO): Promise<{user: IUser}>;
}

export interface IJwtOptions {
  algorithm: string;
  expiresIn: number | string;
}

export interface RegisterDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface Payload {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  confirmed: boolean;
}
