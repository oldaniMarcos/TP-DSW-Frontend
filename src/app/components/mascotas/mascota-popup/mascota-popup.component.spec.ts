import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotaPopupComponent } from './mascota-popup.component';

describe('MascotaPopupComponent', () => {
  let component: MascotaPopupComponent;
  let fixture: ComponentFixture<MascotaPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MascotaPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MascotaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
