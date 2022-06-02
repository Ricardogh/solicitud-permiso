import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {EstadoPagina} from '@app/shared/enum';
@Component({
  selector: 'app-contenedor',
  templateUrl: './contenedor.component.html',
  styleUrls: ['./contenedor.component.scss']
})
export class ContenedorComponent implements OnInit {
  @Input() titulo = '';
  @Input() col = 'col-md-12';
  @Input() banderaEstado: any;
  @Input() icon = 'fa fa-search';
  @Input() card = true;
  @Input() loadingPantalla = false;
  @Output() recargarChange = new EventEmitter();
  EstadoPagina = EstadoPagina;
  constructor() { }

  ngOnInit() {
  }

  recargar() {
    this.recargarChange.emit();
  }

}
