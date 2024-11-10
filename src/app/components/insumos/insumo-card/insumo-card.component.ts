import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Insumo } from '../../../../types';
import { FormsModule } from '@angular/forms';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-insumo-card',
  standalone: true,
  imports: [FormsModule, ConfirmPopupModule, ToastModule],
  templateUrl: './insumo-card.component.html',
  styleUrl: './insumo-card.component.scss'
})
export class InsumoCardComponent {

  constructor(private confirmationService: ConfirmationService) { }

  @ViewChild('deleteButton') deleteButton: any

  @Input() insumo!: Insumo

  @Output() edit: EventEmitter<Insumo> = new EventEmitter<Insumo>()
  @Output() delete: EventEmitter<Insumo> = new EventEmitter<Insumo>()

  editInsumo() {
    this.edit.emit(this.insumo)
  }

  confirmDelete() {
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement,
      message: '¿Eliminar este insumo?',
      accept: () => {
        this.deleteInsumo()
      },
    })
  }

  deleteInsumo() {
    this.delete.emit(this.insumo)
  }

  ngOnInit() {

  }

}
