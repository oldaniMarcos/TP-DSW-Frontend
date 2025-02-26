import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Atencion } from '../../../../types';
import { FormsModule } from '@angular/forms';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-atencion-admin-card',
  standalone: true,
  imports: [FormsModule, ConfirmPopupModule, ToastModule, CommonModule],
  templateUrl: './atencion-admin-card.component.html',
  styleUrls: ['./atencion-admin-card.component.scss'],
})
export class AtencionAdminCardComponent {

  constructor(private confirmationService: ConfirmationService) { }

  @ViewChild('deleteButton') deleteButton: any

  @Input() atencion!: Atencion
  @Input() mascota!: string;
  @Input() fecha!: string;
  @Input() resultado!: string;
  @Input() observaciones!: string;
  @Input() valor!: number;
  @Input() precioAtencion!: number;

  @Output() edit: EventEmitter<Atencion> = new EventEmitter<Atencion>()
  @Output() delete: EventEmitter<Atencion> = new EventEmitter<Atencion>()
  @Output() select = new EventEmitter<Atencion>();

  selectAtencion() {
    this.select.emit(this.atencion);
  }

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
