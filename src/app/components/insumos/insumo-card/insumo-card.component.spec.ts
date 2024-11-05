import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsumoCardComponent } from './insumo-card.component';

describe('InsumoCardComponent', () => {
  let component: InsumoCardComponent;
  let fixture: ComponentFixture<InsumoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsumoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsumoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
