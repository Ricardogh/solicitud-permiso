import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MetodosGlobales } from '@app/shared/metodos-globales';
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
  banderaEstado = true;
  tipoPermisoForma!: FormGroup;
  loadingPantalla = false;
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private metodosGlobales: MetodosGlobales,
    private tipoPermisoSservice: TipoPermisoService
  ) {
    this.inicializarForma();
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  inicializarForma(): void {
    this.tipoPermisoForma = this.fb.group({
      id: [0],
      descripcion: [null, Validators.compose([Validators.required])],
    });
  }

  registrarEmpleado(): void {
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
        this.tipoPermisoSservice.guardar(this.tipoPermisoForma.getRawValue() as TipoPermisoModel)
        .pipe(takeUntil(this.unsubscribe$)).subscribe({
          next: resp => {
            this.loadingPantalla = false;
            if (!this.metodosGlobales.validaError(resp, false)){
              return;
            }
            this.metodosGlobales.transaccionOK(()=> this.inicializarForma());
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

}
