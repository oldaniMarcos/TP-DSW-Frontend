import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesMascotasComponent } from './clientes-mascotas.component';

describe('ClientesMascotasComponent', () => {
  let component: ClientesMascotasComponent;
  let fixture: ComponentFixture<ClientesMascotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesMascotasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesMascotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
