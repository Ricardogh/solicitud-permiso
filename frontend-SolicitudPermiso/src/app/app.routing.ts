import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'gestionar',
        loadChildren: () => import('./pages/gestionar/gestionar.module').then(m => m.GestionarModule),
      },
      {
        path: 'permisos',
        loadChildren: () => import('./pages/permisos/permisos.module').then(m => m.PermisosModule),
      },
      {
        path: 'reportes',
        loadChildren: () => import('./pages/reportes/reportes.module').then(m => m.ReportesModule),
      }
    ]
  }
]

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes, {
  relativeLinkResolution: 'legacy',
  // onSameUrlNavigation: 'reload',
});