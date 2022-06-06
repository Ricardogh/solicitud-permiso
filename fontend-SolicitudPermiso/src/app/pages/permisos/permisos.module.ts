import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermisosComponent } from './permisos.component';
import { PermisosRoutingModule } from './permisos-routing.module';
import { SharedModule } from '@app/shared/shared.module';
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
  ]
})
export class PermisosModule { }
