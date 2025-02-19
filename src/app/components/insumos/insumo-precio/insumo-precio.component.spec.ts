import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsumoPrecioComponent } from './insumo-precio.component';

describe('InsumoPrecioComponent', () => {
  let component: InsumoPrecioComponent;
  let fixture: ComponentFixture<InsumoPrecioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsumoPrecioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsumoPrecioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
