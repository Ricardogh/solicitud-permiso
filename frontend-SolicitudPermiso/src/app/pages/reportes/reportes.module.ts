import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesRoutingModule } from './reportes-routing.module';
import { SharedModule } from '@app/shared/shared.module';

import { EmpleadoService } from '@pages/gestionar/empleado/service/empleado.service';
import { PermisosService } from '@pages/permisos/service/permiso.service';

import { ReportesComponent } from './reportes.component';
import { ListadoPermisoComponent } from './listado-permiso/listado-permiso.component';


@NgModule({
  declarations: [
    ReportesComponent,
    ListadoPermisoComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    SharedModule,
  ],
  providers: [
    EmpleadoService,
    PermisosService
  ]
})
export class ReportesModule { }
