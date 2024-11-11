import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RazaCardComponent } from './raza-card.component';

describe('RazaCardComponent', () => {
  let component: RazaCardComponent;
  let fixture: ComponentFixture<RazaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RazaCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RazaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
