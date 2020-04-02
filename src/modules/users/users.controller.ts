import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
    public async index(@Res() res: Response) {
    const users = await this.usersService.findAll();
    return res.status(HttpStatus.OK).json(users);
  }
}
