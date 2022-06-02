import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.component.html',
  styleUrls: ['./modalpopup.component.scss']
})
export class ModalpopupComponent implements OnInit {
  @Input()headerColor!: string;
  @Input()titulo!: string;
  @Input()modalSize!: string;
  @Input()icon!: string;
  @Input()guardarVisible: boolean = true;
  @Input()public lgModal!: ModalDirective;
  @Output() guardarEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  Guardar() {
    this.guardarEvent.emit();
  }

  Cancelar(){
    this.lgModal.hide();
  }

}
