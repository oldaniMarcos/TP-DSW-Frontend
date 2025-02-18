import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoInsumoPopupComponent } from './tipo-insumo-popup.component';

describe('TipoInsumoPopupComponent', () => {
  let component: TipoInsumoPopupComponent;
  let fixture: ComponentFixture<TipoInsumoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoInsumoPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoInsumoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
