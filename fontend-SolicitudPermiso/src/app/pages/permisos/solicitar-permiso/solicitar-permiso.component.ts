import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import * as moment from 'moment';
import { MetodosGlobales } from '@shared/metodos-globales';

@Component({
  selector: 'app-solicitar-permiso',
  templateUrl: './solicitar-permiso.component.html',
  styleUrls: ['./solicitar-permiso.component.scss']
})
export class SolicitarPermisoComponent implements OnInit {
  banderaEstado = true;
  permisoForma!: FormGroup;
  loadingPantalla = false;
  data = [
    {
      code: 1,
      name:'Ricardo'
    },
    {
      code: 2,
      name:'Selena'
    }
  ];
  diasMaximoPermiso: number = 30;
  constructor(
    private fb: FormBuilder,
    private metodosGlobales: MetodosGlobales
  ) {
    this.inicializarForma();
    // this.today = moment.utc();
   }

  ngOnInit(): void {
  }

  inicializarForma(): void {
    this.permisoForma = this.fb.group({
      id: [0],
      idEmpleado: [null, Validators.compose([Validators.required])],
      idTipoPermiso: [null, Validators.compose([Validators.required])],
      fechaInicial: [null, Validators.compose([Validators.required])],
      fechaFinal: [null, Validators.compose([Validators.required])],
      descripcion: [null, Validators.compose([Validators.required])],
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
        console.log(this.permisoForma.getRawValue());
      }
    });
  }

  validar(): boolean {
    this.permisoForma.markAllAsTouched();
    if (!this.permisoForma.valid) {
      this.metodosGlobales.MensajePersonalizado('falta ingresar datos en el formulario');
      return false;
    }

    if (new Date().getTime() > (this.permisoForma.get('fechaInicial')?.value as Date).getTime()){
      this.metodosGlobales.MensajePersonalizado('debe seleccionar la fecha inicial mayor a la fecha actual');
      return false;
    }

    if ((this.permisoForma.get('fechaInicial')?.value as Date).getTime() >= (this.permisoForma.get('fechaFinal')?.value as Date).getTime()) {
      this.metodosGlobales.MensajePersonalizado('la fecha inicial debe ser menor a la fecha final');
      return false;
    }

    if (moment(this.permisoForma.get('fechaFinal')?.value as Date).diff(moment(this.permisoForma.get('fechaInicial')?.value as Date), 'days') > this.diasMaximoPermiso) {
      this.metodosGlobales.MensajePersonalizado('no se permiten permisos mayores a 30 dias');
      return false;
    }
    return true;
  }

  dateChangeHandler(date: moment.Moment): void {
    console.log(date.toDate());
    
  }

}
