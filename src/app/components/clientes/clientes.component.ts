import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteCardComponent } from './cliente-card/cliente-card.component';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../../types';
import { ClientePopupComponent } from './cliente-popup/cliente-popup.component';
import { FormsModule } from '@angular/forms';
import { ClienteVerPopupComponent } from './cliente-ver-popup/cliente-ver-popup.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, ClienteCardComponent, ClientePopupComponent, ClienteVerPopupComponent, FormsModule, ToastModule], 
  providers: [MessageService],
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
    password: '',
    rol: ''
  };

  dniFilter: string = '';

  constructor(
    private clienteService: ClienteService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.findClientes()
  }

  findClientes(): void {
    this.clienteService.findAll().subscribe(
      (data: Cliente[]) => {

        if (this.dniFilter) {
          this.clientes = data.filter(cliente => cliente.dni.includes(this.dniFilter) && cliente.rol === 'cliente');
        } else {
          this.clientes = data.filter(cliente => cliente.rol === 'cliente');
        }
      },
    );
  }

  createCliente(cliente: Cliente): void {
  this.clienteService.post(cliente).subscribe(
    (newCliente: Cliente) => {
      this.clientes.push(newCliente); 
    },
  );
  }

  updateCliente(id: number, cliente: Cliente): void {
    this.clienteService.patch(id, cliente).subscribe(
      (updatedCliente: Cliente) => {
        const index = this.clientes.findIndex(c => c.id === id);
        if (index > -1) this.clientes[index] = updatedCliente;
      },
    );
  }

  deleteCliente(id: number): void {
    this.clienteService.delete(id).subscribe(
      () => {
        this.clientes = this.clientes.filter(c => c.id !== id);
      },
    );
  }


  displayCreatePopup: boolean = false
  displayUpdatePopup: boolean = false
  displaySelectPopup: boolean = false

  //toggle popups

  toggleCreatePopup() {
    this.displayCreatePopup = true
  }

  toggleUpdatePopup(cliente: Cliente) {
    this.selected = cliente
    this.displayUpdatePopup = true
  }

  toggleSelectPopup(cliente: Cliente) {
    this.selected = cliente
    this.displaySelectPopup = true
  }

  toggleDeletePopup(cliente: Cliente) {
    if (!cliente.id) return

    this.deleteCliente(cliente.id)
  }

  // confirmations

  onConfirmCreate(cliente: Cliente) {
    this.createCliente(cliente)
    this.displayCreatePopup = false

    this.messageService.add({severity: 'success', detail: 'Cliente creado correctamente.', life: 2000});
  }

  onConfirmUpdate(cliente: Cliente) {
    if (!this.selected.id) return

    this.updateCliente(this.selected.id, cliente)
    this.displayUpdatePopup = false

    this.messageService.add({severity: 'success', detail: 'Cliente editado correctamente.', life: 2000});

  }  

}
