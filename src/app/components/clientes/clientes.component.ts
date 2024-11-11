import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteCardComponent } from './cliente-card/cliente-card.component';
import { ClienteService } from '../../services/cliente.service.js';
import { Cliente } from '../../../types.js';
import { ClientePopupComponent } from './cliente-popup/cliente-popup.component';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, ClienteCardComponent, ClientePopupComponent, FormsModule, FloatLabelModule], 
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent {

  clientes: Cliente[] = []
  selected: Cliente = {
    id: 0,
    dni: '',
    nombreYApellido: '',
    telefono: '',
    direccion: '',
    email: '',
    usuario: '',
    password: ''
  };

  clientesFiltrados: Cliente[] = []
  selectedFiltrado: Cliente = {
    id: 0,
    dni: '',
    nombreYApellido: '',
    telefono: '',
    direccion: '',
    email: '',
    usuario: '',
    password: ''
  };

  dniFiltro: string = '';

  constructor(
    private clienteService: ClienteService
  ) { }

  ngOnInit() {
    this.findClientes()
  }

  findClientes(): void {
    this.clienteService.findAll().subscribe(
      (data: Cliente[]) => {
        if (this.dniFiltro) {
          // Filtra los clientes por DNI si se ingresó un filtro
          this.clientes = data.filter(cliente => cliente.dni.includes(this.dniFiltro));
        } else {
          // Si no hay filtro, muestra todos los clientes
          this.clientes = data;
        }
      },
      (error) => {
        console.error('Error al buscar clientes:', error);
      }
    );
  }

  findCliente(id: number): void {
    this.clienteService.findOne(id).subscribe(
      (data: Cliente) => {
        this.selected = data
      },
      (error) => {
        console.error(`Error al buscar cliente con id ${id}:`, error)
      }
    )
  }

  filtrarPorDni() {
    if (this.dniFiltro) {
      this.clientesFiltrados = this.clientes.filter(cliente =>
        cliente.dni.includes(this.dniFiltro)
      );
    } else {
      // Si el campo de búsqueda está vacío, muestra todos los clientes
      this.clientesFiltrados = this.clientes;
    }
  }

  createCliente(cliente: Cliente): void {
  this.clienteService.post(cliente).subscribe(
    (newCliente: Cliente) => {
      this.clientes.push(newCliente); 
    },
    (error) => {
      console.error('Error al crear un cliente:', error);
    }
  );
  }

  updateCliente(id: number, cliente: Cliente): void {
    this.clienteService.patch(id, cliente).subscribe(
      (updatedCliente: Cliente) => {
        const index = this.clientes.findIndex(c => c.id === id);
        if (index > -1) this.clientes[index] = updatedCliente;
      },
      (error) => {
        console.error(`Error al actualizar cliente con id ${id}:`, error);
      }
    );
  }

  deleteCliente(id: number): void {
    this.clienteService.delete(id).subscribe(
      () => {
        this.clientes = this.clientes.filter(c => c.id !== id);
      },
      (error) => {
        console.error(`Error al eliminar cliente con id ${id}:`, error);
      }
    );
  }


  displayCreatePopup: boolean = false
  displayUpdatePopup: boolean = false

  //toggle popups

  toggleCreatePopup() {
    this.displayCreatePopup = true
  }

  toggleUpdatePopup(cliente: Cliente) {
    this.selected = cliente
    this.displayUpdatePopup = true
  }

  toggleDeletePopup(cliente: Cliente) {
    if (!cliente.id) return

    this.deleteCliente(cliente.id)
  }

  // confirmaciones

  onConfirmCreate(cliente: Cliente) {
    this.createCliente(cliente)
    this.displayCreatePopup = false
  }

  onConfirmUpdate(cliente: Cliente) {
    if (!this.selected.id) return

    this.updateCliente(this.selected.id, cliente)
    this.displayUpdatePopup = false

  }  

}
