import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsumoPopupComponent } from './insumo-popup.component';

describe('InsumoPopupComponent', () => {
  let component: InsumoPopupComponent;
  let fixture: ComponentFixture<InsumoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsumoPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsumoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
