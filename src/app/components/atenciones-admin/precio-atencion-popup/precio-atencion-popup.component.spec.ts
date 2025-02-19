import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioAtencionPopupComponent } from './precio-atencion-popup.component';

describe('PrecioAtencionPopupComponent', () => {
  let component: PrecioAtencionPopupComponent;
  let fixture: ComponentFixture<PrecioAtencionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrecioAtencionPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrecioAtencionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
