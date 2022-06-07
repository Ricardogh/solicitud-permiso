import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MetodosGlobales } from '@app/shared/metodos-globales';
import swal from 'sweetalert2';
import * as moment from 'moment';
import { EmpleadoService } from './service/empleado.service';
import { EmpleadoModel } from './model/empleado.model';
import { Subject, takeUntil } from 'rxjs';
import { Paginado } from '@app/core/model/paginado.model';
import { EstadoPagina } from '@app/shared/enum';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.scss']
})
export class EmpleadoComponent implements OnInit, OnDestroy {
  paginado = new Paginado();
  EstadoPagina = EstadoPagina;
  banderaEstado =  EstadoPagina.Cargando;
  banderaCargando = false;
  icon: string = 'fa fa-save';
  array: Array<EmpleadoModel> = [];
  busqueda = {
    valor: '',
    parametro: 'nombreEmpleado'
  };
  cantidadMostrar: Array<Number> = [5, 10, 30, 50];

  empleadoForma!: FormGroup;
  loadingPantalla = false;
  mayorEdad: number = 18;

  tituloModal: string = 'Registrar empleado'
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private metodosGlobales: MetodosGlobales,
    private empleadoService: EmpleadoService
  ) {
    this.paginado.cantidadMostrar = 5;
    this.cargarData();
    // this.inicializarForma();
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
    this.empleadoService.buscarPaginado(
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
        this.array = data.response as EmpleadoModel[];
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

  inicializarForma(titulo: string, lgModalEmpleado: ModalDirective): void {
    this.tituloModal = titulo;
    this.empleadoForma = this.fb.group({
      id: [0],
      nombreEmpleado: [null, Validators.compose([Validators.required])],
      apellidosEmpleado: [null, Validators.compose([Validators.required])],
      fechaNacimiento: [null, Validators.compose([Validators.required])],
      fechaIngreso: [null, Validators.compose([Validators.required])],
    });
    lgModalEmpleado.show();
  }

  registrarEmpleado(lgModalEmpleado: ModalDirective): void {
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
        this.empleadoService.guardar(this.empleadoForma.getRawValue() as EmpleadoModel)
        .pipe(takeUntil(this.unsubscribe$)).subscribe({
          next: resp => {
            this.loadingPantalla = false;
            if (!this.metodosGlobales.validaError(resp, false)){
              return;
            }
            this.metodosGlobales.transaccionOK(()=> {
              this.buscarPaginado({offset: this.paginado.numeroPaginaActual})
              lgModalEmpleado.hide();
            });
          },
          error: error => this.loadingPantalla = false
        })
      }
    });
  }

  validar(): boolean {
    this.empleadoForma.markAllAsTouched();
    if (!this.empleadoForma.valid) {
      this.metodosGlobales.MensajePersonalizado('falta ingresar datos en el formulario');
      return false;
    }
    if(this.mayorEdad > moment(new Date()).diff(moment(this.empleadoForma.get('fechaNacimiento')?.value as Date), 'year')) {
      this.metodosGlobales.MensajePersonalizado('no se puede contratar a menores de edad');
      return false;
    }
    return true;
  }

  modificarRegistro(id: number, lgModalEmpleado: ModalDirective): void {
    this.loadingPantalla = true;
    this.empleadoService.traerEmpleado_X_id(id)
    .pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: resp => {
        this.loadingPantalla = false;
        if (!this.metodosGlobales.validaError(resp, false)){
          return;
        }
        this.inicializarForma('Modificar empleado', lgModalEmpleado);
        this.empleadoForma.patchValue(resp.response as EmpleadoModel);
      },
      error: error => this.loadingPantalla = false
    });
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
        this.empleadoService.eliminar(id)
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
