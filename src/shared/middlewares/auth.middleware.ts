import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';
import * as jwt from 'jsonwebtoken';

import { User } from '../../modules/users/users.entity';
import { MessageCodeError } from '../errors';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  public async use(req: Request, next: NextFunction) {
    /**
     * @TODO Edge and Internet Explorer do some weird things with the headers
     * So I believe that this should handle more 'edge' cases ;)
     */
    if (
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
      const token = (req.headers.authorization as string).split(' ')[1];
      const decoded: any = jwt.verify(token, process.env.JWT_KEY || '');
      const user = await User.findOne<User>({
        where: {
          id: decoded.id,
          email: decoded.email,
        },
      });
      if (!user) { throw new MessageCodeError('request:unauthorized'); }
      next();
    } else {
      throw new MessageCodeError('request:unauthorized');
    }
  }
}
