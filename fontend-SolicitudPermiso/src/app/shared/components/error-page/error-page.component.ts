import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  @Output() recargarChange = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  recargar(): void {
    this.recargarChange.emit();
  }
}
