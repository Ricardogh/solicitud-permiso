import { Component, OnInit, Output, EventEmitter, Type } from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  @Output() recargarChange = new EventEmitter();
    static LoadingNgxComponent: any[] | Type<any>;
  constructor() { }

  ngOnInit() {
  }
  recargar(): void {
    this.recargarChange.emit();
  }
}
