import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { MessageCodeError } from '../errors';

@Catch(MessageCodeError)
export class BadRequestFilter implements ExceptionFilter {
  catch(exception: MessageCodeError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    /* MessageCodeError, Set all header variable to have a context for the client in case of MessageCodeError. */
    res.setHeader('x-message-code-error', exception.messageCode);
    res.setHeader('x-message', exception.message);
    res.setHeader('x-httpStatus-error', exception.httpStatus);

    return res.status(exception.httpStatus).json({
      message: exception.message,
      status: exception.httpStatus,
      timestamp: new Date().toISOString(),
      path: req.url,
    });
  }
}
