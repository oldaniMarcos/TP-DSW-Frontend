import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionAdminPopupComponent } from './atencion-admin-popup.component';

describe('AtencionAdminPopupComponent', () => {
  let component: AtencionAdminPopupComponent;
  let fixture: ComponentFixture<AtencionAdminPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtencionAdminPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtencionAdminPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
