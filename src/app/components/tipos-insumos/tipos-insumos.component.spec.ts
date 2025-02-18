import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposInsumosComponent } from './tipos-insumos.component';

describe('TiposInsumosComponent', () => {
  let component: TiposInsumosComponent;
  let fixture: ComponentFixture<TiposInsumosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposInsumosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposInsumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
