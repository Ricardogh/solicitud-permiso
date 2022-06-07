import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermisosComponent } from './permisos.component';
import { SolicitarPermisoComponent } from './solicitar-permiso/solicitar-permiso.component';
import { VerPermisoComponent } from './ver-permiso/ver-permiso.component';

const routes: Routes = [
  {
    path: '',
    component: PermisosComponent,
    children: [
      {
        path: 'solicitar-permiso',
        component: SolicitarPermisoComponent
      },
      {
        path: 'solicitar-permiso/:id/edit',
        component: SolicitarPermisoComponent
      },
      {
        path: 'ver-permisos',
        component: VerPermisoComponent
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermisosRoutingModule { }
