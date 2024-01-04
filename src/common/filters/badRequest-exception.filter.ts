import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('BadRequestExceptionFilter');
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    this.logger.error(JSON.stringify(exceptionResponse));
    response.status(status).json(
      Object.assign({}, exceptionResponse, {
        path: request.url,
        timestamp: new Date().toISOString(),
      }),
    );
  }
}
