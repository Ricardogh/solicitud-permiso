import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPermisoComponent } from './listado-permiso.component';

describe('ListadoPermisoComponent', () => {
  let component: ListadoPermisoComponent;
  let fixture: ComponentFixture<ListadoPermisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoPermisoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoPermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
