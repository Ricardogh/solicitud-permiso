import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { PermisosService } from '@pages/permisos/service/permiso.service';
import { Paginado } from '@core/model/paginado.model';
import { EmpleadoModel } from '@pages/gestionar/empleado/model/empleado.model';
import { ListadoPermisoEmpleadoModel } from '@pages/permisos/model/permisos.model';
import { EstadoPagina } from '@app/shared/enum';
import { EmpleadoService } from '@app/pages/gestionar/empleado/service/empleado.service';
import * as moment from 'moment';
import { MetodosGlobales } from '@app/shared/metodos-globales';

@Component({
  selector: 'app-listado-permiso',
  templateUrl: './listado-permiso.component.html',
  styleUrls: ['./listado-permiso.component.scss']
})
export class ListadoPermisoComponent implements OnInit, OnDestroy {
  paginado = new Paginado();
  EstadoPagina = EstadoPagina;
  banderaEstado =  EstadoPagina.Cargando;
  loadingPantalla: boolean = false;
  banderaCargando = false;
  arrayCantPermiso: Array<ListadoPermisoEmpleadoModel> = [];
  dataEmpleado: Array<EmpleadoModel> = [];
  busqueda = {
    valor: '',
    parametro: 'e.nombreEmpleado'
  };
  fechaInicial!: Date;
  fechaFinal!: Date;
  idEmpleado: number | null = 0;
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private permisosService: PermisosService,
    private empleadoService: EmpleadoService,
    private metodosGlobales: MetodosGlobales
  ) { 
    this.empleadoService.buscarPaginado('', 'nombreEmpleado', 0, 100)
    .pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: resp => {
        this.loadingPantalla = false;
        this.dataEmpleado = [...this.dataEmpleado, {
          id: 0,
          nombreEmpleado: 'TODOS',
          apellidosEmpleado: '',
          fechaNacimiento: '',
          fechaIngreso: ''
        }];
        (resp.response as Array<EmpleadoModel>).map(item => {
          this.dataEmpleado = [...this.dataEmpleado, item];
        })
        this.banderaEstado = EstadoPagina.Ok;
      },
      error: error => this.loadingPantalla = false
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  buscarPaginado(numeroPagina: any) {
    if (!this.validar()){
      return;
    }
    this.banderaCargando = true;
    this.paginado.numeroPaginaActual = numeroPagina.offset;
    this.permisosService.Listado_EmpleadoCantidadPermiso(
      this.idEmpleado!,
      moment(this.fechaInicial).format('YYYY-MM-DD HH:mm'),
      moment(this.fechaFinal).format('YYYY-MM-DD HH:mm')
    ).pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: data => {
        this.loadingPantalla = false;
        this.paginado.totalElementos = Number(data.total);
        this.arrayCantPermiso = data.response as ListadoPermisoEmpleadoModel[];
        console.log(this.arrayCantPermiso);
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

  validar(): Boolean {
    if (this.idEmpleado == null) {
      this.metodosGlobales.MensajePersonalizado('Seleccione a dato de la lista de empleado');
      return false;
    }

    if (this.fechaInicial == null) {
      this.metodosGlobales.MensajePersonalizado('Elija la fecha inicial antes de continuar');
      return false;
    }

    if (this.fechaFinal == null) {
      this.metodosGlobales.MensajePersonalizado('Elija la fecha final antes de continuar');
      return false;
    }
    return true;
  }

  dateChangeHandler(date: moment.Moment, control: string): void {
    if (control=='fechaInicial') {
      this.fechaInicial = date.toDate();
    } else {
      this.fechaFinal = date.toDate();      
    }
  }

  seletedChange(obj: EmpleadoModel): void {
    if (obj) {
      this.idEmpleado = obj.id;
    } else {
      this.idEmpleado = null;
    }

  }

}
