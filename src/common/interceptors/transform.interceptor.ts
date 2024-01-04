import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { v4 as UUID } from 'uuid';

import { ResponseSuccess, ResponseError } from '../dto/response.dto';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  private readonly logger = new Logger('TransformInterceptor');
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { statusCode } = context.switchToHttp().getResponse();
    const { originalUrl, method, query, body } = req;

    const SID = UUID().replace(/-/g, '');

    let requestParams = JSON.parse(JSON.stringify(body));
    if (method === 'GET') {
      requestParams = JSON.parse(JSON.stringify(query));
    }
    this.logger.log(
      `[Request]: SID = ${SID} - ${method} - ${originalUrl} - ${JSON.stringify(
        requestParams,
      )} - UserID = ${JSON.stringify(req?.user?.id) ?? '未鉴权'}`,
    );

    return next.handle().pipe(
      map((data) => {
        const { isDownload } = data;
        if (isDownload) {
          return data;
        }
        const response = JSON.parse(JSON.stringify(data ?? {}));
        this.logger.log(
          `[Response]: SID = ${SID} - ${statusCode} - ${JSON.stringify(
            response,
          )}`,
        );

        return new ResponseSuccess(data);
      }),
      catchError((err): any => {
        const errResponse = JSON.parse(JSON.stringify(err ?? {}));
        const { status, response } = errResponse;
        this.logger.log(
          `[errResponse]: SID = ${SID} - ${status} - ${JSON.stringify(
            response,
          )}`,
        );
        if (status === 200) {
          throw new HttpException(new ResponseError(response?.message), status);
        }
        throw new HttpException(
          errResponse,
          status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );
  }
}
