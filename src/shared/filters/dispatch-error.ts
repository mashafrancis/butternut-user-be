import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidationError } from 'sequelize';
import { MessageCodeError } from '../errors';

@Catch(MessageCodeError, ValidationError, HttpException, Error)
export class DispatchError implements ExceptionFilter {
  catch(err: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    if (err instanceof MessageCodeError) {
      /* MessageCodeError, Set all header variable to have a context for the client in case of MessageCodeError. */
      res.setHeader('x-message-code-error', err.messageCode);
      res.setHeader('x-message', err.message);
      res.setHeader('x-httpStatus-error', err.httpStatus);

      return res.status(err.httpStatus).json({
        message: err.message,
        statusCode: err.httpStatus,
        timestamp: new Date().toISOString(),
        path: req.url,
      });
    }
    if (err instanceof ValidationError) {
      /* Sequelize validation error. */
      res.setHeader('x-message-code-error', (err as ValidationError).errors[0].type);
      res.setHeader('x-message', (err as ValidationError).errors[0].message);
      res.setHeader('x-httpStatus-error', HttpStatus.BAD_REQUEST);

      return res.status(HttpStatus.BAD_REQUEST).json({
        message: (err as ValidationError).errors[0].message,
        statusCode: HttpStatus.BAD_REQUEST,
        timestamp: new Date().toISOString(),
        path: req.url,
      });
    }
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
  }
}
