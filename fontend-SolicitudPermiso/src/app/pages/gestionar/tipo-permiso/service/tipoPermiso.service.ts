import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ApiService } from '@core/service/api.service';
import { RespuestaDB } from '@core/model/respuestadb.model';
import { TipoPermisoModel } from '../model/tipoPermiso.model';

@Injectable()
export class TipoPermisoService {
  parametros!: string;
  urlPath = '/api/TipoPermiso';
  constructor(private apiService: ApiService) { }

  guardar(modelo: TipoPermisoModel): Observable<any> {
    return this.apiService.post(`${this.urlPath}/guardar`,  modelo )
      .pipe(map((data: RespuestaDB) => data));
  }

  traerTipoPermiso_X_id(id: number) {
    return this.apiService.get(`${this.urlPath}/traerTipoPermiso_X_id/${id}`)
    .pipe(map((data: RespuestaDB) => data));
  }

  buscarPaginado(valor: string, parametro: string, numeroPagina: number, cantidadMostrar: number) {
    this.parametros = `valor=${valor}&parametro=${parametro}
    &numeroPagina=${numeroPagina}&cantidadMostrar=${cantidadMostrar}`;

    return this.apiService.get(`${this.urlPath}/Buscar_TipoPermiso?${this.parametros}`)
  .pipe(map(data => data));
  }
}
