import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspeciePopupComponent } from './especie-popup.component';

describe('EspeciePopupComponent', () => {
  let component: EspeciePopupComponent;
  let fixture: ComponentFixture<EspeciePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspeciePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspeciePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
