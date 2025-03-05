import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { TipoInsumo } from '../../../../types.js';
import { InsumoService } from '../../../services/insumo.service.js';

@Component({
  selector: 'app-tipo-insumo-card',
  standalone: true,
  imports: [FormsModule, ConfirmPopupModule, ToastModule],
  templateUrl: './tipo-insumo-card.component.html',
  styleUrl: './tipo-insumo-card.component.scss',
  providers: [MessageService]
})
export class TipoInsumoCardComponent {

  constructor(
    private confirmationService: ConfirmationService,
    private insumoService: InsumoService,
    private messageService: MessageService) { }
  
  @ViewChild('deleteButton') deleteButton: any

  @Input() tipoInsumo!: TipoInsumo

  @Output() edit: EventEmitter<TipoInsumo> = new EventEmitter<TipoInsumo>()
  @Output() delete: EventEmitter<TipoInsumo> = new EventEmitter<TipoInsumo>()
  @Output() select: EventEmitter<TipoInsumo> = new EventEmitter<TipoInsumo>()

  editTipoInsumo() {
    this.edit.emit(this.tipoInsumo)
  }

  confirmDelete() {
    if (!this.tipoInsumo.codTipoInsumo) {
      return;
    }
  
    this.insumoService.hasTipoInsumo(this.tipoInsumo.codTipoInsumo).subscribe((tieneInsumos) => {
      if (tieneInsumos) {
        this.messageService.add({ severity: 'warn', summary: 'No se puede eliminar', detail: 'Este tipo de insumo tiene insumos registrados.' });
      } else {
        this.confirmationService.confirm({
          target: this.deleteButton.nativeElement,
          message: '¿Eliminar este tipo de insumo?',
          accept: () => {
            this.deleteTipoInsumo();
          },
        });
      }
    });
  }

  deleteTipoInsumo() {
    this.delete.emit(this.tipoInsumo)
  }

  selectTipoInsumo() {
    this.select.emit(this.tipoInsumo)
  }

}
