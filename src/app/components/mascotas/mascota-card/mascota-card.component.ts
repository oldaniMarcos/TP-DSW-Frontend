import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Animal } from '../../../../types';
import { ConfirmationService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-mascota-card',
  standalone: true,
  imports: [FormsModule, ConfirmPopupModule, ToastModule],
  templateUrl: './mascota-card.component.html',
  styleUrls: ['./mascota-card.component.scss'],
})
export class MascotaCardComponent {

  constructor(private confirmationService: ConfirmationService) { }

  @ViewChild('deleteButton') deleteButton: any
 
  @Input() animal!: Animal;
  @Output() delete: EventEmitter<Animal> = new EventEmitter<Animal>();

  confirmDelete() {
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement,
      message: '¿Eliminar esta mascota?',
      accept: () => {
        this.deleteMascota()
      },
    })
  }

  deleteMascota() {
    this.delete.emit(this.animal);
  }
}
