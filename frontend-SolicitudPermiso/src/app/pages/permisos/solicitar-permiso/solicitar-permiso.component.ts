import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, of, Subject, takeUntil } from 'rxjs';
import swal from 'sweetalert2';
import * as moment from 'moment';

import { TipoPermisoService } from '@app/pages/gestionar/tipo-permiso/service/tipoPermiso.service';
import { EmpleadoService } from '@app/pages/gestionar/empleado/service/empleado.service';
import { PermisosService } from '../service/permiso.service';

import { PermisosModel } from '../model/permisos.model';
import { Paginado } from '@app/core/model/paginado.model';
import { EmpleadoModel } from '@app/pages/gestionar/empleado/model/empleado.model';
import { TipoPermisoModel } from '@app/pages/gestionar/tipo-permiso/model/tipoPermiso.model';
import { MetodosGlobales } from '@shared/metodos-globales';
import { EstadoPagina } from '@app/shared/enum';

@Component({
  selector: 'app-solicitar-permiso',
  templateUrl: './solicitar-permiso.component.html',
  styleUrls: ['./solicitar-permiso.component.scss']
})
export class SolicitarPermisoComponent implements OnInit, OnDestroy {
  paginado = new Paginado();
  EstadoPagina = EstadoPagina;
  banderaEstado =  EstadoPagina.Cargando;
  permisoForma!: FormGroup;
  loadingPantalla = false;
  dataEmpleado: Array<EmpleadoModel> = [];
  dataTipoPermiso: Array<TipoPermisoModel> = [];
  
  diasMaximoPermiso: number = 30;
  idPermiso: number = 0;

  private unsubscribe$: Subject<void> = new Subject();

  today!: moment.Moment;
  idEmpleado: number | null = null;
  idTipoPermiso: number | null = null;
  constructor(
    private fb: FormBuilder,
    private metodosGlobales: MetodosGlobales,
    private empleadoService: EmpleadoService,
    private tipoPermisoService: TipoPermisoService,
    private permisosService: PermisosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    of(forkJoin([
      this.empleadoService.buscarPaginado('', 'nombreEmpleado', 0, 100),
      this.tipoPermisoService.buscarPaginado('', 'descripcion', 0, 100)
    ])
    .pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: resp => {
        this.loadingPantalla = false;
        if(!this.metodosGlobales.validaError(resp[1], false)) {
          return;
        }
        this.dataEmpleado = resp[0].response as EmpleadoModel[];
        this.dataTipoPermiso = resp[1].response as TipoPermisoModel[];
        this.banderaEstado = EstadoPagina.Ok;
        this.inicializarForma();
      },
      error: error => this.loadingPantalla = false
    }));
    // this.today = moment.utc();
   }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  inicializarForma(): void {
    this.permisoForma = this.fb.group({
      id: [0],
      idEmpleado: [null, Validators.compose([Validators.required])],
      idTipoPermiso: [null, Validators.compose([Validators.required])],
      fechaHoraInicioPermiso: [null, Validators.compose([Validators.required])],
      fechaHoraFinPermiso: [null, Validators.compose([Validators.required])],
      descripcion: [null, Validators.compose([Validators.required])],
    });
    this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe(param => {
      if (param['id']){
        this.idPermiso = Number(param['id']);
        this.loadingPantalla = true;
        this.permisosService.traerPermisos_X_id(this.idPermiso)
        .pipe(takeUntil(this.unsubscribe$)).subscribe({
          next: resp => {
            this.permisoForma.patchValue(resp.response as PermisosModel);
            this.permisoForma.get('fechaHoraInicioPermiso')?.setValue(moment((resp.response as PermisosModel).fechaHoraInicioPermiso).toDate());
            this.permisoForma.get('fechaHoraFinPermiso')?.setValue(moment((resp.response as PermisosModel).fechaHoraFinPermiso).toDate());
            this.idEmpleado = (resp.response as PermisosModel).idEmpleado;
            this.idTipoPermiso = (resp.response as PermisosModel).idTipoPermiso;
            this.loadingPantalla = false;
          },
          error: error => this.loadingPantalla = false
        });
      }
    });
  }
  
  registrarPermiso(): void {
    if (!this.validar()){
      return;
    }
    swal.fire({
      title: '¿ Guardar registro ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then(confirm => {
      if (confirm.value) {
        this.loadingPantalla = true;
        // console.log(this.permisoForma.getRawValue());
        this.permisosService.guardar(this.permisoForma.getRawValue() as PermisosModel)
        .pipe(takeUntil(this.unsubscribe$)).subscribe({
          next: resp => {
            this.loadingPantalla = false;
            if (!this.metodosGlobales.validaError(resp, false)){
              return;
            }
            this.metodosGlobales.transaccionOK(() => {
              if (this.idPermiso) {
                this.router.navigate(['permisos', 'ver-permisos']);
              } else {
                this.idEmpleado = null;
                this.idTipoPermiso = null;
                this.inicializarForma()
              }
            });
          },
          error: error => this.loadingPantalla = false
        });
      }
    });
  }

  validar(): boolean {
    this.permisoForma.markAllAsTouched();
    if (!this.permisoForma.valid) {
      this.metodosGlobales.MensajePersonalizado('falta ingresar datos en el formulario');
      return false;
    }

    if (new Date().getTime() > (this.permisoForma.get('fechaHoraInicioPermiso')?.value as Date).getTime()){
      this.metodosGlobales.MensajePersonalizado('debe seleccionar la fecha inicial mayor a la fecha actual');
      return false;
    }

    if ((this.permisoForma.get('fechaHoraInicioPermiso')?.value as Date).getTime() >= (this.permisoForma.get('fechaHoraFinPermiso')?.value as Date).getTime()) {
      this.metodosGlobales.MensajePersonalizado('la fecha inicial debe ser menor a la fecha final');
      return false;
    }

    if (moment(this.permisoForma.get('fechaHoraFinPermiso')?.value as Date).diff(moment(this.permisoForma.get('fechaHoraInicioPermiso')?.value as Date), 'days') > this.diasMaximoPermiso) {
      this.metodosGlobales.MensajePersonalizado('no se permiten permisos mayores a 30 dias');
      return false;
    }
    return true;
  }

  cancelarPermiso(): void {
    if (this.idPermiso) {
      this.router.navigate(['permisos', 'ver-permisos']);
    } else {
      this.inicializarForma();
    }
  }

  dateChangeHandler(date: moment.Moment, control: string): void {
    this.permisoForma.get(control)?.setValue(date.toDate());
  }

  seletedChange(obj: EmpleadoModel | TipoPermisoModel, control: string): void {
    if (obj){
      this.permisoForma.get(control)?.setValue(obj.id);
    }
  }

}
