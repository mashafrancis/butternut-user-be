import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const message = (exception as any).message.message;
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    /* MessageCodeError, Set all header variable to have a context for the client in case of MessageCodeError. */
    res.setHeader('x-message-code-error', message);
    res.setHeader('x-message', message);
    res.setHeader('x-httpStatus-error', status);

    return res.status(status).json({
      message,
      status,
      timestamp: new Date().toISOString(),
      path: req.url,
    });
  }
}
