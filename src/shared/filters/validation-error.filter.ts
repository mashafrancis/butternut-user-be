import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidationError } from 'sequelize';

@Catch(ValidationError)
export class ValidationErrorFilter implements ExceptionFilter {
  catch(exception: ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const message = (exception as ValidationError).errors[0].message;
    const messageCode = (exception as ValidationError).errors[0].type;

    /* MessageCodeError, Set all header variable to have a context for the client in case of MessageCodeError. */
    res.setHeader('x-message-code-error', messageCode);
    res.setHeader('x-message', message);
    res.setHeader('x-httpStatus-error', HttpStatus.BAD_REQUEST);

    return res.status(HttpStatus.BAD_REQUEST).json({
      message,
      status: HttpStatus.BAD_REQUEST,
      timestamp: new Date().toISOString(),
      path: req.url,
    });
  }
}
