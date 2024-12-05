import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Veterinario } from '../../../../types';
import { FormsModule } from '@angular/forms';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-veterinario-card',
  standalone: true,
  imports: [FormsModule, ConfirmPopupModule, ToastModule, ButtonModule],
  templateUrl: './veterinario-card.component.html',
  styleUrl: './veterinario-card.component.scss'
})
export class VeterinarioCardComponent {

  constructor(private confirmationService: ConfirmationService) { }

  @ViewChild('deleteButton') deleteButton: any

  @Input() veterinario!: Veterinario

  @Output() edit: EventEmitter<Veterinario> = new EventEmitter<Veterinario>()
  @Output() delete: EventEmitter<Veterinario> = new EventEmitter<Veterinario>()

  editVeterinario() {
    this.edit.emit(this.veterinario)
  }

  confirmDelete() {
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement,
      message: '¿Eliminar este veterinario?',
      accept: () => {
        this.deleteVeterinario()
      },
    })
  }

  deleteVeterinario() {
    this.delete.emit(this.veterinario)
  }

  ngOnInit() {

  }

}
