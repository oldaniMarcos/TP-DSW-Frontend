import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientesComponent } from './clientes.component';
import { ClienteService } from '../../services/cliente.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { Cliente } from '../../../types';
import { FormsModule } from '@angular/forms';
import { ClienteCardComponent } from './cliente-card/cliente-card.component';
import { ClientePopupComponent } from './cliente-popup/cliente-popup.component';
import { ClienteVerPopupComponent } from './cliente-ver-popup/cliente-ver-popup.component';
import { ToastModule } from 'primeng/toast';

describe('ClientesComponent', () => {
  let component: ClientesComponent;
  let fixture: ComponentFixture<ClientesComponent>;
  let clienteServiceMock: jasmine.SpyObj<ClienteService>;
  let messageServiceMock: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    clienteServiceMock = jasmine.createSpyObj('ClienteService', ['findAll', 'post', 'patch', 'delete']);
    messageServiceMock = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      imports: [FormsModule, ToastModule, ClientesComponent, ClienteCardComponent, ClientePopupComponent, ClienteVerPopupComponent],
      providers: [
        { provide: ClienteService, useValue: clienteServiceMock },
        { provide: MessageService, useValue: messageServiceMock },
      ],
    });

    fixture = TestBed.createComponent(ClientesComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call findClientes on init', () => {
    const mockClientes: Cliente[] = [
      { id: 1, dni: '11222333', nombreYApellido: 'Test 1', telefono: '', direccion: '', email: '', usuario: '', password: '', rol: 'cliente' },
      { id: 2, dni: '11444555', nombreYApellido: 'Test 2', telefono: '', direccion: '', email: '', usuario: '', password: '', rol: 'cliente' },
    ];
    clienteServiceMock.findAll.and.returnValue(of(mockClientes));

    component.ngOnInit();

    expect(clienteServiceMock.findAll).toHaveBeenCalled();
    expect(component.clientes).toEqual(mockClientes);
  });

  it('should create a new client', () => {
    const newClient: Cliente = { id: 3, dni: '11555999', nombreYApellido: 'Test 3', telefono: '', direccion: '', email: '', usuario: '', password: '', rol: 'cliente' };
    clienteServiceMock.post.and.returnValue(of(newClient));

    component.createCliente(newClient);

    expect(clienteServiceMock.post).toHaveBeenCalledWith(newClient);
    expect(component.clientes).toContain(newClient);
  });

  it('should update a client', () => {
    const updatedClient: Cliente = { id: 1, dni: '11222333', nombreYApellido: 'Test 1 Actualizado', telefono: '', direccion: '', email: '', usuario: '', password: '', rol: 'cliente' };
    clienteServiceMock.patch.and.returnValue(of(updatedClient));
    component.clientes = [{ id: 1, dni: '11222333', nombreYApellido: 'Test 1 Anterior', telefono: '', direccion: '', email: '', usuario: '', password: '', rol: 'cliente' }];

    component.updateCliente(1, updatedClient);

    expect(clienteServiceMock.patch).toHaveBeenCalledWith(1, updatedClient);
    expect(component.clientes[0].nombreYApellido).toBe('Test 1 Actualizado');
  });

  it('should delete a client', () => {
    const clientToDelete: Cliente = { id: 1, dni: '11222333', nombreYApellido: 'Test 1', telefono: '', direccion: '', email: '', usuario: '', password: '', rol: 'cliente' };
    clienteServiceMock.delete.and.returnValue(of(undefined));
    component.clientes = [clientToDelete];

    component.deleteCliente(1);

    expect(clienteServiceMock.delete).toHaveBeenCalledWith(1);
    expect(component.clientes.length).toBe(0);
  });

  it('should toggle create popup', () => {
    component.toggleCreatePopup();

    expect(component.displayCreatePopup).toBeTrue();
  });

  it('should toggle update popup', () => {
    const client: Cliente = { id: 1, dni: '11222333', nombreYApellido: 'Test 1', telefono: '', direccion: '', email: '', usuario: '', password: '', rol: 'cliente' };
    component.toggleUpdatePopup(client);

    expect(component.displayUpdatePopup).toBeTrue();
    expect(component.selected).toEqual(client);
  });

  it('should toggle select popup', () => {
    const client: Cliente = { id: 1, dni: '11222333', nombreYApellido: 'Test 1', telefono: '', direccion: '', email: '', usuario: '', password: '', rol: 'cliente' };
    component.toggleSelectPopup(client);

    expect(component.displaySelectPopup).toBeTrue();
    expect(component.selected).toEqual(client);
  });
});
