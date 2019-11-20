import { Inject, Injectable } from '@nestjs/common';
import { MessageCodeError } from '../../shared/errors';
import Logger from '../../utils/logger';
import { IUser, IUserService } from './interfaces';
import { User } from './users.entity';

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @Inject('UserRepository') private readonly user: typeof User,
    @Inject('SequelizeInstance') private readonly sequelizeInstance: any
  ) {}

  public async findAll(): Promise<User[]> {
    try {
      return this.user.findAll<User>();
    } catch (e) {
      Logger.error(e);
      throw new Error(e);
    }
  }

  public async findById(id: number): Promise<User | null> {
    try {
      return this.user.findByPk<User>(id);
    } catch (e) {
      Logger.error(e);
      throw new Error(e);
    }
  }

  public async findOne(options: Object): Promise<User | null> {
    try {
      return this.user.findOne<User>(options);
    } catch (e) {
      Logger.error(e);
      throw new Error(e);
    }
  }

  public async create(userData: IUser): Promise<User> {
    try {
      return await this.sequelizeInstance.transaction(async (t: any) => {
        return this.user.create<User>(userData, { transaction: t });
      });
    } catch (e) {
      Logger.error(e);
      throw new Error(e);
    }
  }

  public async update(id: number, newValue: IUser): Promise<User | null> {
    try {
      return await this.sequelizeInstance.transaction(async (t: any) => {
        let user = await this.user.findByPk<User>(id, {
          transaction: t,
        });
        if (!user) { throw new MessageCodeError('user:notFound'); }
        user = UsersService._assign(user, newValue);
        return user.save({
          transaction: t,
        });
      });
    } catch (e) {
      Logger.error(e);
      throw new Error(e);
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      return await this.sequelizeInstance.transaction(async (t: any) => {
        return this.user.destroy({
          where: { id },
          transaction: t,
        });
      });
    } catch (e) {
      Logger.error(e);
      throw new Error(e);
    }
  }

  /**
   * @description: Assign new value in the users found in the database.
   *
   * @param {IUser} user
   * @param {IUser} newValue
   * @return {User}
   * @private
   */
  // tslint:disable-next-line:function-name
  private static _assign(user: IUser, newValue: IUser): User {
    for (const key of Object.keys(user)) {
      // @ts-ignore
      if (user[key] !== newValue[key]) { user[key] = newValue[key]; }
    }

    return user as User;
  }
}
