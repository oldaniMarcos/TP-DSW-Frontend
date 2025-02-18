import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { TipoInsumo } from '../../../../types.js';

@Component({
  selector: 'app-tipo-insumo-card',
  standalone: true,
  imports: [FormsModule, ConfirmPopupModule, ToastModule],
  templateUrl: './tipo-insumo-card.component.html',
  styleUrl: './tipo-insumo-card.component.scss'
})
export class TipoInsumoCardComponent {

  constructor(private confirmationService: ConfirmationService) { }
  
  @ViewChild('deleteButton') deleteButton: any

  @Input() tipoInsumo!: TipoInsumo

  @Output() edit: EventEmitter<TipoInsumo> = new EventEmitter<TipoInsumo>()
  @Output() delete: EventEmitter<TipoInsumo> = new EventEmitter<TipoInsumo>()
  @Output() select: EventEmitter<TipoInsumo> = new EventEmitter<TipoInsumo>()

  editTipoInsumo() {
    this.edit.emit(this.tipoInsumo)
  }

  confirmDelete() {
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement,
      message: '¿Eliminar este tipo de insumo?',
      accept: () => {
        this.deleteTipoInsumo()
      },
    })
  }

  deleteTipoInsumo() {
    this.delete.emit(this.tipoInsumo)
  }

  selectTipoInsumo() {
    this.select.emit(this.tipoInsumo)
  }

}
