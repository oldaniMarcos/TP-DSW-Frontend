import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteCardComponent } from './cliente-card/cliente-card.component';
import { ClienteService } from '../../services/cliente.service.js';
import { Cliente } from '../../../types.js';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, ClienteCardComponent],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent {

  clientes: Cliente[] = []
  selected: Cliente | null = null

  constructor(
    private clienteService: ClienteService
  ) { }

  ngOnInit() {
    this.findClientes()
  }

  findClientes(): void {
    this.clienteService.findAll().subscribe(
      (data: Cliente[]) => {
        this.clientes = data
      },
      (error) => {
        console.error('Error al buscar clientes:', error)
      }
    )
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

  mostrarModal: boolean = false;
  toggleModal(): void {
    this.mostrarModal = !this.mostrarModal;
  }  

}
