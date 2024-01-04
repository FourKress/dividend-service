import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('HttpExceptionsFilter');
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    this.logger.error(JSON.stringify(errorResponse));

    let result;
    if (status === 200) {
      result = handleServiceException(exception);
    } else {
      result = handleHttpException(status, request.url, exception);
    }
    response.status(status).json(result);
  }
}

const handleHttpException = (statusCode: number, path: string, error: any) => {
  return {
    statusCode,
    timestamp: new Date().toISOString(),
    path,
    error,
  };
};

const handleServiceException = (exception: HttpException) => {
  return exception.getResponse();
};
