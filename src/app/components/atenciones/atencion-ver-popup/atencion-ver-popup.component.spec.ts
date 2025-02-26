import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionVerPopupComponent } from './atencion-ver-popup.component';

describe('AtencionVerPopupComponent', () => {
  let component: AtencionVerPopupComponent;
  let fixture: ComponentFixture<AtencionVerPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtencionVerPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtencionVerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
