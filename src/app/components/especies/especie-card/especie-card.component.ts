import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Especie } from '../../../../types';
import { FormsModule } from '@angular/forms';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { RazaService } from '../../../services/raza.service';

@Component({
  selector: 'app-especie-card',
  standalone: true,
  imports: [FormsModule, ConfirmPopupModule, ToastModule],
  templateUrl: './especie-card.component.html',
  styleUrl: './especie-card.component.scss',
  providers: [MessageService]
})
export class EspecieCardComponent {

constructor(
    private confirmationService: ConfirmationService,
    private razaService: RazaService,
    private messageService: MessageService) { }
  @ViewChild('deleteButton') deleteButton: any

  @Input() especie!: Especie
  @Output() delete: EventEmitter<Especie> = new EventEmitter<Especie>()

  confirmDelete() {
    if (!this.especie.codEspecie) {
      return;
    }
  
    this.razaService.hasEspecie(this.especie.codEspecie).subscribe((hasRaza) => {
      if (hasRaza) {
        this.messageService.add({ severity: 'warn', summary: 'No se puede eliminar', detail: 'Esta especie tiene razas registradas.' });
      } else {
        this.confirmationService.confirm({
          target: this.deleteButton.nativeElement,
          message: '¿Eliminar esta especie?',
          accept: () => {
            this.deleteEspecie();
          },
        });
      }
    });
  }

  deleteEspecie() {
    this.delete.emit(this.especie)
  }

}
