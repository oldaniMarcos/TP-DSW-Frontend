import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RazasComponent } from './razas.component';
import { RazaService } from '../../services/raza.service';
import { EspecieService } from '../../services/especie.service';
import { of } from 'rxjs';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

describe('RazasComponent', () => {
  let component: RazasComponent;
  let fixture: ComponentFixture<RazasComponent>;
  let razaService: jasmine.SpyObj<RazaService>;
  let especieService: jasmine.SpyObj<EspecieService>;
  let messageService: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    const razaServiceSpy = jasmine.createSpyObj('RazaService', ['findAll', 'post', 'patch', 'delete']);
    const especieServiceSpy = jasmine.createSpyObj('EspecieService', ['findAll']);
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      imports: [FormsModule, ToastModule],
      providers: [
        { provide: RazaService, useValue: razaServiceSpy },
        { provide: EspecieService, useValue: especieServiceSpy },
        { provide: MessageService, useValue: messageServiceSpy },
      ]
    });

    fixture = TestBed.createComponent(RazasComponent);
    component = fixture.componentInstance;
    razaService = TestBed.inject(RazaService) as jasmine.SpyObj<RazaService>;
    especieService = TestBed.inject(EspecieService) as jasmine.SpyObj<EspecieService>;
    messageService = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
    razaService.findAll.and.returnValue(of([{ codRaza: 1, descripcion: 'Raza 1', idEspecie: 1 }]));
    especieService.findAll.and.returnValue(of([{ idEspecie: 1, descripcion: 'Especie 1' }]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch razas on init', () => {
    component.ngOnInit();
    expect(razaService.findAll).toHaveBeenCalled();
    expect(component.breeds.length).toBe(1);
  });

  it('should filter razas based on razasFiltro', () => {
    component.breedsFilter = 'Raza 1';
    component.findRazas();
    expect(component.breeds.length).toBe(1);

    component.breedsFilter = 'No Existe';
    component.findRazas();
    expect(component.breeds.length).toBe(0);
  });

  it('should fetch especies on init', () => {
    component.ngOnInit();
    expect(especieService.findAll).toHaveBeenCalled();
    expect(component.breeds.length).toBe(1);
  });

  it('should create a new raza', () => {
    const newBreed = { codRaza: 2, descripcion: 'Raza 2', idEspecie: 1 };
    razaService.post.and.returnValue(of(newBreed));
    component.createRaza(newBreed);
    expect(razaService.post).toHaveBeenCalledWith(newBreed);
    expect(component.breeds.length).toBe(1);
  });

  it('should open the create popup', () => {
    component.toggleCreatePopup();
    expect(component.displayCreatePopup).toBeTrue();
  });
});
