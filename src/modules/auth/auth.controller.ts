import { Body, Controller, HttpStatus, Next, Post, Req, Res } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { MessageCodeError } from '../../shared/errors';
import Logger from '../../utils/logger';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @Post('register')
  public async register(@Body() body: AuthDto, @Res() res: Response, @Req() req: Request, @Next() next: NextFunction) {
    try {
      Logger.debug('Calling Register endpoint with body: %o', req.body);
      const { user } = await this.authService.register(body);
      return res.status(HttpStatus.CREATED).send({
        success: true,
        message: 'Account registration successful',
        data: user,
      });
    } catch (e) {
      Logger.error('🔥 error: %o', e);
      return next(e);
    }
  }

  @Post('login')
  public async login(@Body() body: AuthDto, @Res() res: Response, @Req() req: Request) {
    Logger.debug('Calling Login endpoint with body: %o', req.body);
    if (!body) { throw new MessageCodeError('auth:login:missingInformation'); }
    if (!body.email) { throw new MessageCodeError('auth:login:missingEmail'); }
    if (!body.password) { throw new MessageCodeError('auth:login:missingPassword'); }

    const token = await this.authService.login(body);
    return res.status(HttpStatus.OK).json({ token });
  }
}
