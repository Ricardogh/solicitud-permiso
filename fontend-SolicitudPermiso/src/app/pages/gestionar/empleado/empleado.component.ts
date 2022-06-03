import { EstadoPagina } from './../../../shared/enum/estado-pagina';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.scss']
})
export class EmpleadoComponent implements OnInit {
  banderaEstado = true;
  constructor() { }

  ngOnInit(): void {
  }

}
