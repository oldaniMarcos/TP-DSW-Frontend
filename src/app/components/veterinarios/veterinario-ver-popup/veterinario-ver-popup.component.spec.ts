import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinarioVerPopupComponent } from './veterinario-ver-popup.component';

describe('VeterinarioVerPopupComponent', () => {
  let component: VeterinarioVerPopupComponent;
  let fixture: ComponentFixture<VeterinarioVerPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeterinarioVerPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeterinarioVerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
