import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoPermisoComponent } from './listado-permiso/listado-permiso.component';
import { ReportesComponent } from './reportes.component';

const routes: Routes = [
  {
    path: '',
    component: ReportesComponent,
    children: [
      {
        path: 'listado-permiso',
        component: ListadoPermisoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }
