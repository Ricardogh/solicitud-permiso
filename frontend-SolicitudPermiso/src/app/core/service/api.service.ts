import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';

import { environment } from '@environments/environment';

@Injectable()
export class ApiService {
     headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
  constructor(
    private http: HttpClient,
    public router: Router
  ) {}

  private formatErrors(error: any) {
    let errorMessage = '';
    if (Number(error.status) === 401) {
      this.router.navigateByUrl('/login');
      errorMessage = 'Usuario no autorizado requiere autenticación';
    } else if (Number(error.status) === 0) {
      errorMessage = 'Error de respuesta del servidor';
    } else if (Number(error.status) === 404) {
      errorMessage = 'Error en la llamada HTTP, no found';
    } else if (Number(error.status) === 505) {
      errorMessage = 'Versión de HTTP no soportada';
    } else if (Number(error.status) === 500) {
      errorMessage = 'Error de servidor interno';
    } else if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return  throwError(errorMessage);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { headers: this.headersConfig, params });
  }

  put(path: string, body: object = {}): Observable<any> {
    return this.http.put(`${environment.api_url}${path}`, JSON.stringify(body), {headers: this.headersConfig });
  }

  putData(path: string, body: FormData): Observable<any> {
    return this.http.put(`${environment.api_url}${path}`, body);
  }

  post(path: string, body: object = {}): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`, JSON.stringify(body),
       {headers: this.headersConfig}
    );
  }

  postDownloadFile(path: string, body: object = {}): Observable<any> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.post(`${environment.api_url}${path}`, JSON.stringify(body),
      {
        headers,
        observe: 'response',
        responseType: 'blob'
      }
    );
  }

  postBlob(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.headersConfig, responseType: 'blob' }
    );
  }

  postData(path: string, body: FormData): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`, body);
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${environment.api_url}${path}`, {headers: this.headersConfig }
    ); 
  }

  getBlob(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, {
      headers: this.headersConfig,
      responseType: 'blob'
    });
  }
}
