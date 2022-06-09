import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ApiService } from '@core/service/api.service';
import { RespuestaDB } from '@core/model/respuestadb.model';
import { PermisosModel } from '../model/permisos.model';

@Injectable()
export class PermisosService {
  parametros!: string;
  urlPath = '/api/Permisos';
  constructor(private apiService: ApiService) { }

  guardar(modelo: PermisosModel): Observable<any> {
    return this.apiService.post(`${this.urlPath}/guardar`,  modelo )
      .pipe(map((data: RespuestaDB) => data));
  }

  eliminar(id: number): Observable<any> {
    return this.apiService.delete(`${this.urlPath}/eliminar/${id}` )
      .pipe(map((data: RespuestaDB) => data));
  }

  traerPermisos_X_id(id: number) {
    return this.apiService.get(`${this.urlPath}/traerPermisos_X_id/${id}`)
    .pipe(map((data) => data));
  }

  buscarPaginado(valor: string, parametro: string, numeroPagina: number, cantidadMostrar: number) {
    this.parametros = `valor=${valor}&parametro=${parametro}&numeroPagina=${numeroPagina}&cantidadMostrar=${cantidadMostrar}`;

    return this.apiService.get(`${this.urlPath}/Buscar_Permisos?${this.parametros}`)
  .pipe(map(data => data));
  }

  Listado_EmpleadoCantidadPermiso(idEmpleado: number, fechaInicial: string, fechaFinal: string) {
    this.parametros = `idEmpleado=${idEmpleado}&fechaInicial=${fechaInicial}&fechaFinal=${fechaFinal}`;

    return this.apiService.get(`${this.urlPath}/Listado_EmpleadoCantidadPermiso?${this.parametros}`)
  .pipe(map(data => data));
  }

  Listado_EmpleadoTipoPermiso(idEmpleado: number, fechaInicial: string, fechaFinal: string) {
    this.parametros = `idEmpleado=${idEmpleado}&fechaInicial=${fechaInicial}&fechaFinal=${fechaFinal}`;

    return this.apiService.get(`${this.urlPath}/Listado_EmpleadoTipoPermiso?${this.parametros}`)
  .pipe(map(data => data));
  }
}
