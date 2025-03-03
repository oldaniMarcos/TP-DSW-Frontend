import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Veterinario } from '../../../../types';
import { FormsModule } from '@angular/forms';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { AtencionService } from '../../../services/atencion.service';

@Component({
  selector: 'app-veterinario-card',
  standalone: true,
  imports: [FormsModule, ConfirmPopupModule, ToastModule, ButtonModule],
  templateUrl: './veterinario-card.component.html',
  styleUrl: './veterinario-card.component.scss',
  providers: [MessageService]
})
export class VeterinarioCardComponent {

    constructor(
        private confirmationService: ConfirmationService,
        private atencionService: AtencionService,
        private messageService: MessageService
    ) {}
  @ViewChild('deleteButton') deleteButton: any

  @Input() veterinario!: Veterinario

  @Output() edit: EventEmitter<Veterinario> = new EventEmitter<Veterinario>()
  @Output() delete: EventEmitter<Veterinario> = new EventEmitter<Veterinario>()
  @Output() select: EventEmitter<Veterinario> = new EventEmitter<Veterinario>()


  editVeterinario() {
    this.edit.emit(this.veterinario)
  }

  confirmDelete() {
    if (!this.veterinario.idVeterinario) {
      return;
    }
  
    this.atencionService.hasVeterinario(this.veterinario.idVeterinario).subscribe((tieneAtenciones) => {
      if (tieneAtenciones) {
        this.messageService.add({ severity: 'warn', summary: 'No se puede eliminar', detail: 'Este veterinario tiene atenciones registradas.' });
      } else {
        this.confirmationService.confirm({
          target: this.deleteButton.nativeElement,
          message: '¿Eliminar este veterinario?',
          accept: () => {
            this.deleteVeterinario();
          },
        });
      }
    });
  }

  deleteVeterinario() {
    this.delete.emit(this.veterinario)
  }

  selectVeterinario() {
    this.select.emit(this.veterinario)
  }

  ngOnInit() {

  }

}
