import { Injectable, ErrorHandler } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS, HttpResponse, HttpClient } from '@angular/common/http';
import { Observable,throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorinterceptorService implements HttpInterceptor
{
  intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>
  {

      return next.handle(req).pipe(catchError(error=>
      {

        if(error instanceof HttpErrorResponse)
                   console.log("request pipe line",error.message)

        return throwError(error)
      }))
  }

}

export  const HttpInterceptorProvider=
{
   provide:HTTP_INTERCEPTORS,
   useClass:ErrorinterceptorService,
   multi:true
}
