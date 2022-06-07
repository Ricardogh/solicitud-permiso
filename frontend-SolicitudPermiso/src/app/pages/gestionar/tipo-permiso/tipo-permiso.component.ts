import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Paginado } from '@app/core/model/paginado.model';
import { EstadoPagina } from '@app/shared/enum';
import { MetodosGlobales } from '@app/shared/metodos-globales';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subject, takeUntil } from 'rxjs';
import swal from 'sweetalert2';
import { TipoPermisoModel } from './model/tipoPermiso.model';
import { TipoPermisoService } from './service/tipoPermiso.service';

@Component({
  selector: 'app-tipo-permiso',
  templateUrl: './tipo-permiso.component.html',
  styleUrls: ['./tipo-permiso.component.scss']
})
export class TipoPermisoComponent implements OnInit {

  paginado = new Paginado();
  EstadoPagina = EstadoPagina;
  banderaEstado =  EstadoPagina.Cargando;
  banderaCargando = false;
  icon: string = 'fa fa-save';
  array: Array<TipoPermisoModel> = [];
  busqueda = {
    valor: '',
    parametro: 'descripcion'
  };
  cantidadMostrar: Array<Number> = [5, 10, 30, 50];

  tipoPermisoForma!: FormGroup;
  loadingPantalla = false;
  tituloModal: string = 'Registrar tipo permiso'
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private metodosGlobales: MetodosGlobales,
    private tipoPermisoService: TipoPermisoService
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
    this.tipoPermisoService.buscarPaginado(
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
        this.array = data.response as TipoPermisoModel[];
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

  inicializarForma(titulo: string, lgModalTipoPermiso: ModalDirective): void {
    this.tituloModal = titulo;
    this.tipoPermisoForma = this.fb.group({
      id: [0],
      descripcion: [null, Validators.compose([Validators.required])],
    });
    lgModalTipoPermiso.show();
  }

  registrarTipoPermiso(lgModalTipoPermiso: ModalDirective): void {
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
        this.tipoPermisoService.guardar(this.tipoPermisoForma.getRawValue() as TipoPermisoModel)
        .pipe(takeUntil(this.unsubscribe$)).subscribe({
          next: resp => {
            this.loadingPantalla = false;
            if (!this.metodosGlobales.validaError(resp, false)){
              return;
            }
            this.metodosGlobales.transaccionOK(()=> {
              this.buscarPaginado({offset: this.paginado.numeroPaginaActual})
              lgModalTipoPermiso.hide();
            });
          },
          error: error => this.loadingPantalla = false
        })
      }
    });
  }

  validar(): boolean {
    this.tipoPermisoForma.markAllAsTouched();
    if (!this.tipoPermisoForma.valid) {
      this.metodosGlobales.MensajePersonalizado('falta ingresar datos en el formulario');
      return false;
    }
    return true;
  }

  modificarRegistro(id: number, lgModalEmpleado: ModalDirective): void {
    this.loadingPantalla = true;
    this.tipoPermisoService.traerTipoPermiso_X_id(id)
    .pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: resp => {
        this.loadingPantalla = false;
        if (!this.metodosGlobales.validaError(resp, false)){
          return;
        }
        this.inicializarForma('Modificar empleado', lgModalEmpleado);
        this.tipoPermisoForma.patchValue(resp.response as TipoPermisoModel);
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
        this.tipoPermisoService.eliminar(id)
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
