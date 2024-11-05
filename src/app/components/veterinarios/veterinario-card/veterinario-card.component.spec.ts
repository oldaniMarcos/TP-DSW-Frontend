import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinarioCardComponent } from './veterinario-card.component';

describe('VeterinarioCardComponent', () => {
  let component: VeterinarioCardComponent;
  let fixture: ComponentFixture<VeterinarioCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeterinarioCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeterinarioCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
