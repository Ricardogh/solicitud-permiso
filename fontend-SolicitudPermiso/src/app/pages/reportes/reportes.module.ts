import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { ReportesComponent } from './reportes.component';
import { ListadoPermisoComponent } from './listado-permiso/listado-permiso.component';


@NgModule({
  declarations: [
    ReportesComponent,
    ListadoPermisoComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule
  ]
})
export class ReportesModule { }
