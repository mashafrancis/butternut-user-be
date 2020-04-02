import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { sign } from 'jsonwebtoken';

import { MessageCodeError } from '../../shared/errors';
import { IUser } from '../users/interfaces';
import { UsersService } from '../users/users.service';
import { IAuthService, IJwtOptions, LoginDTO, Payload, RegisterDTO } from './interfaces/auth-service.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(private readonly usersService: UsersService) {}
  private _options: IJwtOptions = {
    algorithm: 'HS256',
    expiresIn: '7 days',
  };

  get options(): IJwtOptions {
    return this._options;
  }

  set options(value: IJwtOptions) {
    this._options.algorithm = value.algorithm;
  }

  public async register(userData: RegisterDTO): Promise<{user: IUser}> {
    try {
      const userRecord = await this.usersService.create(userData);
      return { user: userRecord };
    } catch (e) {
      throw new Error(e);
    }
  }

  public async login(credentials: LoginDTO): Promise<any> {
    const userRecord = await this.usersService.findOne({ where: { email: credentials.email } });
    if (!userRecord) {
      throw new MessageCodeError('user:notFound');
    }
    const validPassword = await argon2.verify(userRecord.password, credentials.password);
    if (validPassword) {
      const payload: Payload = {
        id: userRecord.id,
        firstName: userRecord.firstName,
        lastName: userRecord.lastName,
        email: userRecord.email,
        confirmed: userRecord.confirmed,
      };
      return this.generateToken(payload);
    }
    throw new MessageCodeError('auth:login:invalidPassword');
  }

  public generateToken(payload: Payload) {
    return sign(payload, process.env.JWT_SECRET || '', this._options
    );
  }
}
