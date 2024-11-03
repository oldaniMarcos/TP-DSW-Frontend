import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionesAdminComponent } from './atenciones-admin.component';

describe('AtencionesAdminComponent', () => {
  let component: AtencionesAdminComponent;
  let fixture: ComponentFixture<AtencionesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtencionesAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtencionesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
