import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MetodosGlobales } from '@app/shared/metodos-globales';
import swal from 'sweetalert2';
import * as moment from 'moment';
import { EmpleadoService } from './service/empleado.service';
import { EmpleadoModel } from './model/empleado.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.scss']
})
export class EmpleadoComponent implements OnInit, OnDestroy {
  banderaEstado = true;
  empleadoForma!: FormGroup;
  loadingPantalla = false;
  mayorEdad: number = 18;
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private metodosGlobales: MetodosGlobales,
    private empleadoService: EmpleadoService
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
    this.empleadoForma = this.fb.group({
      id: [0],
      nombreEmpleado: [null, Validators.compose([Validators.required])],
      apellidosEmpleado: [null, Validators.compose([Validators.required])],
      fechaNacimiento: [null, Validators.compose([Validators.required])],
      fechaIngreso: [null, Validators.compose([Validators.required])],
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
        this.empleadoService.guardar(this.empleadoForma.getRawValue() as EmpleadoModel)
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

}
