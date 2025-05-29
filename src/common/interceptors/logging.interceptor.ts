import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { Log } from 'src/database/entity/logs.entity';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body } = request;

    const now = Date.now();

    return next.handle().pipe(
      map(async (responseData) => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;

        // Save log to DB
        await Log.create({
          method,
          url,
          requestBody: body,
          responseBody: responseData,
          statusCode,
        } as Log);

        return responseData;
      }),
    );
  }
}
