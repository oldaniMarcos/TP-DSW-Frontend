import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientePopupComponent } from './cliente-popup.component';

describe('ClientePopupComponent', () => {
  let component: ClientePopupComponent;
  let fixture: ComponentFixture<ClientePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
