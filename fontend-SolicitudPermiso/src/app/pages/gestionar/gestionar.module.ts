import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionarRoutingModule } from './gestionar-routing.module';
import { GestionarComponent } from './gestionar.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { TipoPermisoComponent } from './tipo-permiso/tipo-permiso.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [
    GestionarComponent,
    EmpleadoComponent,
    TipoPermisoComponent
  ],
  imports: [
    CommonModule,
    GestionarRoutingModule,
    MaterialModule,
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS , useValue: {float: 'always'} }
  ],
})
export class GestionarModule { }
