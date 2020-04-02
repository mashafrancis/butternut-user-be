import 'dotenv/config';
import 'reflect-metadata';

import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
// import * as csurf from 'csurf';
// import { NextFunction, Request, Response } from 'express';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestFilter } from './shared/filters/bad-request.filter';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { ValidationErrorFilter } from './shared/filters/validation-error.filter';
import Logger from './utils/logger';

const PORT = process.env.PORT || 5001;

async function bootstrap(): Promise<any> {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.use(helmet());
  app.enableCors();
  app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }));
  app.use(compression());

  // now add csrf and other middlewares, after the "/api" was mounted
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  // app.use(csurf({ cookie: true }));

  app.useGlobalFilters(
    new BadRequestFilter(),
    new HttpExceptionFilter(),
    new ValidationErrorFilter()
  );

  // @ts-ignore
  await app.listen(PORT, (err: any) => {
    if (err) {
      Logger.error(err);
      process.exit(1);
      return;
    }
    Logger.info(`
      ########################################
      😎  Server listening on port: ${PORT} 😎
      ########################################
    `);
  });
}

bootstrap().catch(err => Logger.error(err));
