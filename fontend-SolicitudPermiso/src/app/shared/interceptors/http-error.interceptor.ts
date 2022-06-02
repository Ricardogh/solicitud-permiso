import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MetodosGlobales } from '../metodos-globales/metodos-globales';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private _metodosGlobales: MetodosGlobales, public router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
            if (Number(error.status) === 401) {
              this.router.navigateByUrl('/login');
              errorMessage = 'Código de error(401): Usuario no autorizado, requiere autenticación';
            } else if (Number(error.status) === 0) {
              errorMessage = 'Código de error(0): Error de respuesta del servidor...';
            } else if (Number(error.status) === 404) {
              errorMessage = 'Código de error(404): Error en la llamada HTTP, no found';
            } else if (Number(error.status) === 505) {
              errorMessage = 'Código de error(505): Versión de HTTP no soportada';
            } else if (Number(error.status) === 500) {
              errorMessage = 'Código de error(500): Error de servidor interno';
            } else if (error.error instanceof ErrorEvent) {
              // client-side error
              errorMessage = `Error: ${error.error.message}`;
            } else {
              // server-side error
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            }
            this._metodosGlobales.MensajePersonalizado(errorMessage);
            return throwError(errorMessage);
        })
      );
  }
}
