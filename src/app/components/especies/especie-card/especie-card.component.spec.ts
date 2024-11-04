import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecieCardComponent } from './especie-card.component';

describe('EspecieCardComponent', () => {
  let component: EspecieCardComponent;
  let fixture: ComponentFixture<EspecieCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspecieCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspecieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
