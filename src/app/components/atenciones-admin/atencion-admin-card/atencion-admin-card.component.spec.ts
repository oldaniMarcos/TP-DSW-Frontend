import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionAdminCardComponent } from './atencion-admin-card.component';

describe('AtencionAdminCardComponent', () => {
  let component: AtencionAdminCardComponent;
  let fixture: ComponentFixture<AtencionAdminCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtencionAdminCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtencionAdminCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
