import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteVerPopupComponent } from './cliente-ver-popup.component';

describe('ClienteVerPopupComponent', () => {
  let component: ClienteVerPopupComponent;
  let fixture: ComponentFixture<ClienteVerPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteVerPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteVerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
