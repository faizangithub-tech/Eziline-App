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

        if(error instanceof HttpErrorResponse){
          const applicationerror= error.headers.get('Application-Error')
            if(applicationerror){
                console.log("http error interceptor",applicationerror)
              return throwError(applicationerror)}
            else{
                return throwError(error.error)}}

      }))
  }

}

export  const HttpInterceptorProvider=
{
   provide:HTTP_INTERCEPTORS,
   useClass:ErrorinterceptorService,
   multi:true
}
