import { TestBed } from '@angular/core/testing';
import { ClienteService } from './cliente.service';
import { ApiService } from './api.service';
import { of } from 'rxjs';
import { Cliente } from '../../types';

describe('ClienteService', () => {
  let service: ClienteService;
  let apiServiceMock: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    apiServiceMock = jasmine.createSpyObj('ApiService', ['get', 'post', 'patch', 'delete']);

    TestBed.configureTestingModule({
      providers: [
        ClienteService,
        { provide: ApiService, useValue: apiServiceMock },
      ],
    });
    service = TestBed.inject(ClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all clientes from findAll()', () => {
    const mockClientes: Cliente[] = [
      { id: 1, nombreYApellido: 'Test 1', dni: '11222333', telefono: '341556677', direccion: 'test1 123', email: 'test1@test.com', usuario: 'test1', password: 'test1', rol: 'cliente' },
      { id: 2, nombreYApellido: 'Test 2', dni: '11444555', telefono: '341778899', direccion: 'test2 123', email: 'test2@test.com', usuario: 'test2', password: 'test2', rol: 'cliente' },
    ];

    apiServiceMock.get.and.returnValue(of(mockClientes));

    service.findAll().subscribe((clientes) => {
      expect(clientes).toEqual(mockClientes);
      expect(apiServiceMock.get).toHaveBeenCalledWith(`${service['URL']}`, {});
    });
  });

  it('should return a single cliente from findOne()', () => {
    const mockCliente: Cliente = { id: 1, nombreYApellido: 'Test 1', dni: '11222333', telefono: '341556677', direccion: 'test1 123', email: 'test1@test.com', usuario: 'test1', password: 'test1', rol: 'cliente' };

    apiServiceMock.get.and.returnValue(of(mockCliente));

    service.findOne(1).subscribe((cliente) => {
      expect(cliente).toEqual(mockCliente);
      expect(apiServiceMock.get).toHaveBeenCalledWith(`${service['URL']}/1`, {});
    });
  });

  it('should create a new cliente with post()', () => {
    const newCliente: Cliente = { id: 3, nombreYApellido: 'Test 3', dni: '11555999', telefono: '341443366', direccion: 'test3 123', email: 'test3@test.com', usuario: 'test3', password: 'test3', rol: 'cliente' };
    
    apiServiceMock.post.and.returnValue(of(newCliente));

    service.post(newCliente).subscribe((cliente) => {
      expect(cliente).toEqual(newCliente);
      expect(apiServiceMock.post).toHaveBeenCalledWith(service['URL'], newCliente, {});
    });
  });

  it('should update an existing cliente with patch()', () => {
    const updatedCliente: Cliente = { id: 1, nombreYApellido: 'Test 1 Actualizado', dni: '11222333', telefono: '341556677', direccion: 'test1 123', email: 'test1@test.com', usuario: 'test1', password: 'test1', rol: 'cliente' };

    apiServiceMock.patch.and.returnValue(of(updatedCliente));

    service.patch(1, updatedCliente).subscribe((cliente) => {
      expect(cliente).toEqual(updatedCliente);
      expect(apiServiceMock.patch).toHaveBeenCalledWith(`${service['URL']}/1`, updatedCliente, {});
    });
  });

  it('should delete a cliente with delete()', () => {
    apiServiceMock.delete.and.returnValue(of(undefined));

    service.delete(1).subscribe(() => {
      expect(apiServiceMock.delete).toHaveBeenCalledWith(`${service['URL']}/1`, {});
    });
  });

  it('should check for existing dni, email, and usuario with check()', () => {
    const checkData = { dni: '12345', email: 'test@example.com', usuario: 'user1' };
    
    apiServiceMock.post.and.returnValue(of(checkData));

    service.check('12345', 'test@example.com', 'user1').subscribe((data) => {
      expect(data).toEqual(checkData);
      expect(apiServiceMock.post).toHaveBeenCalledWith(
        `${service['URL']}/check`, 
        checkData, 
        {}
      );
    });
  });
});
