import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotaVerPopupComponent } from './mascota-ver-popup.component';

describe('MascotaVerPopupComponent', () => {
  let component: MascotaVerPopupComponent;
  let fixture: ComponentFixture<MascotaVerPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MascotaVerPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MascotaVerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
