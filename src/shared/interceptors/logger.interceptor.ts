import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  
  @Injectable()
  export class LoggerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      // uruchamiane przy wykryciu requestu
      console.log('***');
      console.log(context.getArgs()[0].method, context.getArgs()[0].url);
      console.log(`Start request in ${context.getClass().name}`);
  
      const start = Date.now();
  
      // uruchamiane przed zwróceniem odpowiedzi
      return next.handle().pipe(
        tap(() => {
          console.log(`Request ended in: ${Date.now() - start}ms`);
          console.log('***');
        }),
      );
    }
  }