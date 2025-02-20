import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Animal } from '../../../../types';
import { FormsModule } from '@angular/forms';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-mascota-card',
  standalone: true,
  imports: [FormsModule, ConfirmPopupModule, ToastModule, ButtonModule],
  templateUrl: './mascota-card.component.html',
  styleUrl: './mascota-card.component.scss'
})
export class MascotaCardComponent {

  constructor(private confirmationService: ConfirmationService) { }

  @ViewChild('deleteButton') deleteButton: any

  @Input() animal!: Animal

  @Output() edit: EventEmitter<Animal> = new EventEmitter<Animal>()
  @Output() delete: EventEmitter<Animal> = new EventEmitter<Animal>()
  @Output() select: EventEmitter<Animal> = new EventEmitter<Animal>()


  editMascota() {
    this.edit.emit(this.animal)
  }

  confirmDelete() {
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement,
      message: '¿Eliminar este animal?',
      accept: () => {
        this.deleteMascota()
      },
    })
  }

  deleteMascota() {
    this.delete.emit(this.animal)
  }

  selectMascota() {
    this.select.emit(this.animal)
  }

  ngOnInit() {

  }

}
