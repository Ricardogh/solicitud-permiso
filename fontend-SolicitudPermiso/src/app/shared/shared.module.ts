import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { NgxLoadingModule } from "ngx-loading";

import { MaterialModule } from "../material.module";
import { MenuService } from "./components/menu/services/menu.service";
import { LoadingNgxComponent } from './loading-ngx/loading-ngx.component';
import { ContenedorComponent } from './components/contenedor/contenedor.component';
import { ModalpopupComponent } from './components/modalpopup/modalpopup.component';
import { LoadingScreenInterceptor } from "./interceptors";
import { LoadingScreenService } from "./loading-ngx/service/loading-screen.service";
import { ErrorPageComponent } from "./components/error-page/error-page.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        HttpClientJsonpModule,
        CommonModule,
        RouterModule,
        NgxLoadingModule.forRoot({})
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: LoadingScreenInterceptor, multi: true },
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS , useValue: {float: 'always'} },
        MenuService,
        LoadingScreenService
    ],    
    declarations: [
        ModalpopupComponent,        
        LoadingNgxComponent,
        ContenedorComponent,
        ModalpopupComponent,
        ErrorPageComponent
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        ModalpopupComponent,
        LoadingNgxComponent,
        ContenedorComponent,
        ModalpopupComponent,
        ErrorPageComponent
    ]
})

export class SharedModule { }