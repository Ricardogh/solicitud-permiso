import { Component, OnDestroy, OnInit } from '@angular/core';
import { MetodosGlobales } from '@app/shared/metodos-globales';
import { Subject, takeUntil } from 'rxjs';
import swal from 'sweetalert2';

import { Paginado } from '@core/model/paginado.model';
import { ListadoPermisosModel } from '../model/permisos.model';
import { PermisosService } from '../service/permiso.service';
import { EstadoPagina } from '@shared/enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-permiso',
  templateUrl: './ver-permiso.component.html',
  styleUrls: ['./ver-permiso.component.scss']
})
export class VerPermisoComponent implements OnInit, OnDestroy {
  paginado = new Paginado();
  EstadoPagina = EstadoPagina;
  banderaEstado =  EstadoPagina.Cargando;
  banderaCargando = false;
  icon: string = 'fa fa-search';
  loadingPantalla: boolean = false;
  array: Array<ListadoPermisosModel> = [];
  busqueda = {
    valor: '',
    parametro: 'e.nombreEmpleado'
  };
  cantidadMostrar: Array<Number> = [5, 10, 30, 50];
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private permisosService: PermisosService,
    private metodosGlobales: MetodosGlobales,
    private router: Router
  ) {
    this.paginado.cantidadMostrar = 5;
    this.cargarData();
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  cargarData(): void {
    this.paginado.numeroPaginaActual = 0;
    this.buscarPaginado({ offset: this.paginado.numeroPaginaActual });
  }

  reload() {
    this.banderaEstado = EstadoPagina.Cargando;
    this.cargarData();
  }

  buscarPaginado(numeroPagina: any) {
    this.banderaCargando = true;
    this.paginado.numeroPaginaActual = numeroPagina.offset;
    this.permisosService.buscarPaginado(
      this.busqueda.valor,
      this.busqueda.parametro,
      this.paginado.numeroPaginaActual,
      this.paginado.cantidadMostrar
    ).pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: data => {
        this.loadingPantalla = false;
        if (!this.metodosGlobales.validaError(data, false)) {
          this.banderaEstado = EstadoPagina.Error;
          return;
        }
        this.paginado.totalElementos = Number(data.total);
        this.array = data.response as ListadoPermisosModel[];
        this.banderaCargando = false;
        this.banderaEstado = EstadoPagina.Ok;
      },
      error: error => {
        this.banderaCargando = false;
        this.loadingPantalla = false;
        this.banderaEstado = EstadoPagina.Error;
      }
    });
  }

  numeroRegistrosMostrados(valor: any) {
    this.paginado.cantidadMostrar = valor.srcElement.value;
    this.buscarPaginado({ offset: this.paginado.numeroPaginaActual });
  }

  modificarRegistro(id: number): void {
    this.router.navigate(['permisos', 'solicitar-permiso', id, 'edit']);
  }

  eliminarRegistro(id: number): void {
    swal.fire({
      title: '¿ Eliminar registro ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then(confirm => {
      if (confirm.value) {
        this.loadingPantalla = true;
        this.permisosService.eliminar(id)
        .pipe(takeUntil(this.unsubscribe$)).subscribe({
          next: resp => {
            this.loadingPantalla = false;
            if (!this.metodosGlobales.validaError(resp, false)){
              return;
            }
            this.metodosGlobales.transaccionOK(()=> {
              this.buscarPaginado({offset: this.paginado.numeroPaginaActual})
            });
          },
          error: error => this.loadingPantalla = false
        })
      }
    });
  }

}
