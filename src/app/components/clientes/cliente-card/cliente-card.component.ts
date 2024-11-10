import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { Cliente } from '../../../../types';

@Component({
  selector: 'app-cliente-card',
  standalone: true,
  imports: [FormsModule, ConfirmPopupModule, ToastModule],
  templateUrl: './cliente-card.component.html',
  styleUrls: ['./cliente-card.component.scss'],
})
export class ClienteCardComponent {
  
  constructor(private confirmationService: ConfirmationService) { }

  @ViewChild('deleteButton') deleteButton: any

  @Input() cliente!: Cliente

  @Output() edit: EventEmitter<Cliente> = new EventEmitter<Cliente>()
  @Output() delete: EventEmitter<Cliente> = new EventEmitter<Cliente>()

  editCliente() {
    this.edit.emit(this.cliente)
  }

  confirmDelete() {
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement,
      message: '¿Eliminar este cliente?',
      accept: () => {
        this.deleteCliente()
      },
    })
  }

  deleteCliente() {
    this.delete.emit(this.cliente)
  }

}
