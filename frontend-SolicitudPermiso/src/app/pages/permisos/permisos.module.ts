import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermisosComponent } from './permisos.component';
import { PermisosRoutingModule } from './permisos-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { SolicitarPermisoComponent } from './solicitar-permiso/solicitar-permiso.component';
import { VerPermisoComponent } from './ver-permiso/ver-permiso.component';
import { EmpleadoService } from '../gestionar/empleado/service/empleado.service';
import { TipoPermisoService } from '../gestionar/tipo-permiso/service/tipoPermiso.service';
import { PermisosService } from './service/permiso.service';


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
