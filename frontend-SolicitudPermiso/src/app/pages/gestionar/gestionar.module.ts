import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionarRoutingModule } from './gestionar-routing.module';
import { GestionarComponent } from './gestionar.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { TipoPermisoComponent } from './tipo-permiso/tipo-permiso.component';
import { SharedModule } from '@app/shared/shared.module';
import { EmpleadoService } from './empleado/service/empleado.service';
import { TipoPermisoService } from './tipo-permiso/service/tipoPermiso.service';

@NgModule({
  declarations: [
    GestionarComponent,
    EmpleadoComponent,
    TipoPermisoComponent
  ],
  imports: [
    CommonModule,
    GestionarRoutingModule,
    SharedModule
  ],
  providers: [
    EmpleadoService,
    TipoPermisoService
  ],
})
export class GestionarModule { }
