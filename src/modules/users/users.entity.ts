import * as argon2 from 'argon2';
import { randomBytes } from 'crypto';
import {
  BeforeCreate,
  BeforeValidate,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  Model,
  Table,
  UpdatedAt
} from 'sequelize-typescript';

import { MessageCodeError } from '../../shared/errors';
import { uid } from '../../utils/fancyGenerator';

@Table({
  timestamps: true,
  tableName: 'users',
})
export class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    unique: true,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  public id: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  public firstName: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  public lastName: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    validate: {
      isEmail: true,
      isUnique: async (value: string, next: Function): Promise<any> => {
        const isExist = await User.findOne({ where: { email: value } });
        if (isExist) {
          const error = new MessageCodeError('user:create:emailAlreadyExist');
          next(error);
        }
        next();
      },
    },
  })
  public email: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  public password: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  public confirmed: boolean;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;

  @DeletedAt public deletedAt: Date;

  @BeforeValidate
    public static validateData(user: User, options: any) {
    if (!options.transaction) { throw new Error('Missing transaction.'); }
    if (!user.firstName) { throw new MessageCodeError('user:create:missingFirstName'); }
    if (!user.lastName) { throw new MessageCodeError('user:create:missingLastName'); }
    if (!user.email) { throw new MessageCodeError('user:create:missingEmail'); }
    if (!user.password) { throw new MessageCodeError('user:create:missingPassword'); }
  }

  @BeforeCreate
    public static async userId(user: User) {
    user.id = await uid.generate();
  }

  @BeforeCreate
    public static async hashPassword(user: User, options: any) {
    if (!options.transaction) { throw new Error('Missing transaction.'); }

    const salt = randomBytes(32);
    user.password = await argon2.hash(user.password as string, { salt });
  }
}
