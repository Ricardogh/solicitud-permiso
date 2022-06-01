import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientJsonpModule, HttpClientModule } from "@angular/common/http";
import { MenuService } from "./components/menu/services/menu.service";
import { MaterialModule } from "../material.module";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [
        HttpClientModule,
        MaterialModule,
        HttpClientJsonpModule,
        CommonModule,
        RouterModule,
    ],
    providers: [
        MenuService
    ]
})

export class SharedModule { }