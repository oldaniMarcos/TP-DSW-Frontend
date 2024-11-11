import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { Raza } from '../../../../types.js';

@Component({
  selector: 'app-raza-card',
  standalone: true,
  imports: [FormsModule, ConfirmPopupModule, ToastModule],
  templateUrl: './raza-card.component.html',
  styleUrl: './raza-card.component.scss'
})
export class RazaCardComponent {

  constructor(private confirmationService: ConfirmationService) { }

  @ViewChild('deleteButton') deleteButton: any

  @Input() raza!: Raza

  @Output() edit: EventEmitter<Raza> = new EventEmitter<Raza>()
  @Output() delete: EventEmitter<Raza> = new EventEmitter<Raza>()

  editRaza() {
    this.edit.emit(this.raza)
  }

  confirmDelete() {
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement,
      message: '¿Eliminar esta raza?',
      accept: () => {
        this.deleteRaza()
      },
    })
  }

  deleteRaza() {
    this.delete.emit(this.raza)
  }

  ngOnInit() {

  }


}
