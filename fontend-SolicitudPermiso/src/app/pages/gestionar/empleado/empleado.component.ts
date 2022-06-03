import { EstadoPagina } from '@app/shared/enum/estado-pagina';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.scss']
})
export class EmpleadoComponent implements OnInit {
  banderaEstado = true;
  empleadoForma!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.inicializarForma();
   }

  ngOnInit(): void {
  }

  inicializarForma(): void {
    this.empleadoForma = this.fb.group({
      id: [0],
      nombre: [null, Validators.compose([Validators.required])],
      apellidos: [null, Validators.compose([Validators.required])],
      fechaNacimiento: [null, Validators.compose([Validators.required])],
      fechaIngreso: [null, Validators.compose([Validators.required])],
    });
  }

}
