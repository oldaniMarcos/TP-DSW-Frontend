import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionAdminVerPopupComponent } from './atencion-admin-ver-popup.component';

describe('AtencionAdminVerPopupComponent', () => {
  let component: AtencionAdminVerPopupComponent;
  let fixture: ComponentFixture<AtencionAdminVerPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtencionAdminVerPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtencionAdminVerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
