import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinarioPopupComponent } from './veterinario-popup.component';

describe('VeterinarioPopupComponent', () => {
  let component: VeterinarioPopupComponent;
  let fixture: ComponentFixture<VeterinarioPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeterinarioPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeterinarioPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
