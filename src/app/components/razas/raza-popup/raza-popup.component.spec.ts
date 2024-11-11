import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RazaPopupComponent } from './raza-popup.component';

describe('RazaPopupComponent', () => {
  let component: RazaPopupComponent;
  let fixture: ComponentFixture<RazaPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RazaPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RazaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
