import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermisosRoutingModule } from './permisos-routing.module';
import { SharedModule } from '@app/shared/shared.module';

import { EmpleadoService } from '@pages/gestionar/empleado/service/empleado.service';
import { TipoPermisoService } from '@pages/gestionar/tipo-permiso/service/tipoPermiso.service';
import { PermisosService } from '@pages/permisos/service/permiso.service';

import { PermisosComponent } from './permisos.component';
import { SolicitarPermisoComponent } from './solicitar-permiso/solicitar-permiso.component';
import { VerPermisoComponent } from './ver-permiso/ver-permiso.component';


@NgModule({
  declarations: [
    PermisosComponent,
    SolicitarPermisoComponent,
    VerPermisoComponent
  ],
  imports: [
    CommonModule,
    PermisosRoutingModule,
    SharedModule
  ],
  providers: [
    EmpleadoService,
    TipoPermisoService,
    PermisosService
  ]
})
export class PermisosModule { }
