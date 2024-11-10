import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Atencion } from '../../../../types';
import { FormsModule } from '@angular/forms';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-atencion-admin-card',
  standalone: true,
  imports: [FormsModule, ConfirmPopupModule, ToastModule],
  templateUrl: './atencion-admin-card.component.html',
  styleUrls: ['./atencion-admin-card.component.scss'],
})
export class AtencionAdminCardComponent {

  constructor(private confirmationService: ConfirmationService) { }

  @ViewChild('deleteButton') deleteButton: any

  @Input() atencion!: Atencion

  @Output() edit: EventEmitter<Atencion> = new EventEmitter<Atencion>()
  @Output() delete: EventEmitter<Atencion> = new EventEmitter<Atencion>()

  editAtencion() {
    this.edit.emit(this.atencion)
  }

  confirmDelete() {
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement,
      message: '¿Eliminar esta atencion?',
      accept: () => {
        this.deleteAtencion()
      },
    })
  }

  deleteAtencion() {
    this.delete.emit(this.atencion)
  }

}
