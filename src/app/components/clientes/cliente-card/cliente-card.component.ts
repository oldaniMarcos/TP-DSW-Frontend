import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { Cliente } from '../../../../types';
import { AtencionService } from '../../../services/atencion.service';

@Component({
  selector: 'app-cliente-card',
  standalone: true,
  imports: [FormsModule, ConfirmPopupModule, ToastModule],
  templateUrl: './cliente-card.component.html',
  styleUrls: ['./cliente-card.component.scss'],
  providers: [MessageService]
})
export class ClienteCardComponent {
  
  constructor(private confirmationService: ConfirmationService, private atencionService: AtencionService, private messageService: MessageService) { }

  @ViewChild('deleteButton') deleteButton: any

  @Input() cliente!: Cliente

  @Output() edit: EventEmitter<Cliente> = new EventEmitter<Cliente>()
  @Output() delete: EventEmitter<Cliente> = new EventEmitter<Cliente>()
  @Output() select: EventEmitter<Cliente> = new EventEmitter<Cliente>()

  editCliente() {
    this.edit.emit(this.cliente)
  }

  confirmDelete() {
    if (!this.cliente.id) {
      return;
    }
  
    this.atencionService.hasCliente(this.cliente.id).subscribe((tieneAtenciones) => {
      if (tieneAtenciones) {
        this.messageService.add({ severity: 'warn', summary: 'No se puede eliminar', detail: 'Este cliente tiene atenciones registradas.' });
      } else {
        this.confirmationService.confirm({
          target: this.deleteButton.nativeElement,
          message: '¿Eliminar este cliente?',
          accept: () => {
            this.deleteCliente();
          },
        });
      }
    });
  }

  deleteCliente() {
    this.delete.emit(this.cliente)
  }

  selectCliente() {
    this.select.emit(this.cliente)
  }

}
