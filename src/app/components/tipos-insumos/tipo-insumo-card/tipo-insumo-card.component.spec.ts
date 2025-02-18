import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoInsumoCardComponent } from './tipo-insumo-card.component';

describe('TipoInsumoCardComponent', () => {
  let component: TipoInsumoCardComponent;
  let fixture: ComponentFixture<TipoInsumoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoInsumoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoInsumoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
