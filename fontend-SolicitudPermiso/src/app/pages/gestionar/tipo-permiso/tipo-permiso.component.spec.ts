import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPermisoComponent } from './tipo-permiso.component';

describe('TipoPermisoComponent', () => {
  let component: TipoPermisoComponent;
  let fixture: ComponentFixture<TipoPermisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoPermisoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoPermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
