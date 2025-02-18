import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsumoVerPopupComponent } from './insumo-ver-popup.component';

describe('InsumoVerPopupComponent', () => {
  let component: InsumoVerPopupComponent;
  let fixture: ComponentFixture<InsumoVerPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsumoVerPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsumoVerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
