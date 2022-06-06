import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/components/header/header.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared/shared.module';
import { PagesComponent } from './pages/pages.component';
import { routing } from './app.routing';

import localeEs from '@angular/common/locales/es';
import {registerLocaleData} from '@angular/common';
import { CoreModule } from './core/core.module';

registerLocaleData(localeEs,'es');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    routing,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
