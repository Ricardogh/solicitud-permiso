import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { NgxLoadingModule } from "ngx-loading";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";

import { MaterialModule } from "@app/material.module";
import { MaterialExtensionsModule } from "@app/material-extensions.module";

import { MenuService } from "./components/menu/services/menu.service";
import { ContenedorComponent } from './components/contenedor/contenedor.component';
import { ModalpopupComponent } from './components/modalpopup/modalpopup.component';
import { ErrorPageComponent } from "./components/error-page/error-page.component";
import { LoadingScreenService } from "./components/loading-ngx/service/loading-screen.service";
import { MetodosGlobales } from "./metodos-globales";
import { LoadingNgxComponent } from "./components/loading-ngx/loading-ngx.component";
import { HttpErrorInterceptor, LoadingScreenInterceptor } from "./interceptors";
import { ModalModule } from "ngx-bootstrap/modal";

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        MaterialExtensionsModule,
        HttpClientJsonpModule,
        CommonModule,
        RouterModule,
        NgxDatatableModule,
        NgxLoadingModule.forRoot({}),
        ModalModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: LoadingScreenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS , useValue: {float: 'always'} },
        MenuService,
        LoadingScreenService,
        MetodosGlobales
    ],    
    declarations: [
        ModalpopupComponent,        
        LoadingNgxComponent,
        ContenedorComponent,
        ModalpopupComponent,
        ErrorPageComponent
    ],
    entryComponents: [ModalpopupComponent],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        MaterialExtensionsModule,
        ModalModule,
        NgxDatatableModule,
        ModalpopupComponent,
        LoadingNgxComponent,
        ContenedorComponent,
        ModalpopupComponent,
        ErrorPageComponent,
    ]
})

export class SharedModule { }