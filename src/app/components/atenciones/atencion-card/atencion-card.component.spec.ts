import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionCardComponent } from './atencion-card.component';

describe('AtencionCardComponent', () => {
  let component: AtencionCardComponent;
  let fixture: ComponentFixture<AtencionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtencionCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtencionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
