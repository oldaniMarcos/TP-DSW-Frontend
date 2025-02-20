import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteMascotaCardComponent } from './cliente-mascota-card.component';

describe('ClienteMascotaCardComponent', () => {
  let component: ClienteMascotaCardComponent;
  let fixture: ComponentFixture<ClienteMascotaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteMascotaCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteMascotaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
