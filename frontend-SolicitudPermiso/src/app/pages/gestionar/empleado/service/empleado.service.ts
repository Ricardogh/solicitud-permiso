import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ApiService } from '@core/service/api.service';
import { RespuestaDB } from '@core/model/respuestadb.model';
import { EmpleadoModel } from '../model/empleado.model';

@Injectable()
export class EmpleadoService {
  parametros!: string;
  urlPath = '/api/Empleado';
  constructor(private apiService: ApiService) { }

  guardar(modelo: EmpleadoModel): Observable<any> {
    return this.apiService.post(`${this.urlPath}/guardar`,  modelo )
      .pipe(map((data: RespuestaDB) => data));
  }

  eliminar(id: number): Observable<any> {
    return this.apiService.delete(`${this.urlPath}/eliminar/${id}` )
      .pipe(map((data: RespuestaDB) => data));
  }

  traerEmpleado_X_id(id: number) {
    return this.apiService.get(`${this.urlPath}/traerEmpleado_X_id/${id}`)
    .pipe(map((data) => data));
  }

  buscarPaginado(valor: string, parametro: string, numeroPagina: number, cantidadMostrar: number) {
    this.parametros = `valor=${valor}&parametro=${parametro}&numeroPagina=${numeroPagina}&cantidadMostrar=${cantidadMostrar}`;

    return this.apiService.get(`${this.urlPath}/Buscar_Empleado?${this.parametros}`)
    .pipe(map(data => data));
  }

}
