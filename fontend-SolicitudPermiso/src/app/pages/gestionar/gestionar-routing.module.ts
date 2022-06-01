import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoComponent } from './empleado/empleado.component';
import { GestionarComponent } from './gestionar.component';
import { TipoPermisoComponent } from './tipo-permiso/tipo-permiso.component';

const routes: Routes = [
  {
    path: '',
    component: GestionarComponent,
    children: [
      {
        path: 'empleado',
        component: EmpleadoComponent
      },
      {
        path: 'tipo-permiso',
        component: TipoPermisoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionarRoutingModule { }
