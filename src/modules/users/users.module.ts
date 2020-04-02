import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { DatabaseModule } from '../../database/database.module';
import { AuthMiddleware } from '../../shared/middlewares/auth.middleware';
import { UsersController } from './users.controller';
import { usersProvider } from './users.provider';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  exports: [UsersService],
  providers: [UsersService, ...usersProvider],
})
export class UsersModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/users', method: RequestMethod.GET }
      );
  }
}
