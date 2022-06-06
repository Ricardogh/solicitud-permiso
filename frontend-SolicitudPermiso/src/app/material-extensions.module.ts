import { NgModule } from "@angular/core";
import { MtxSelectModule } from '@ng-matero/extensions/select';
import { MtxDatetimepickerModule } from '@ng-matero/extensions/datetimepicker';
import { DatetimeAdapter, MTX_DATETIME_FORMATS } from '@ng-matero/extensions/core';
import { MomentDatetimeAdapter, MTX_MOMENT_DATETIME_FORMATS } from '@ng-matero/extensions-moment-adapter';
import { MatMomentDateModule, MomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
    exports: [
        MtxSelectModule,
        MtxDatetimepickerModule,
        MatMomentDateModule,
        MomentDateModule,
    ],
    providers: [
        { 
            provide: MTX_DATETIME_FORMATS,
            useValue: {
                parse: {
                  dateInput: 'DD/MM/YYYY',
                  monthInput: 'MMMM',
                  timeInput: 'HH:mm',
                  datetimeInput: 'DD/MM/YYYY HH:mm',
                },
                display: {
                  dateInput: 'DD/MM/YYYY',
                  monthInput: 'MMMM',
                  timeInput: 'HH:mm',
                  datetimeInput: 'DD/MM/YYYY HH:mm',
                  monthYearLabel: 'YYYY MMMM',
                  dateA11yLabel: 'LL',
                  monthYearA11yLabel: 'MMMM YYYY',
                  popupHeaderDateLabel: 'MMM DD, ddd',
                },
              },
        }, 
        { provide: DatetimeAdapter, useClass: MomentDatetimeAdapter },
    ]
})

export class MaterialExtensionsModule {}