import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Veterinario } from '../../../../types';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-veterinario-ver-popup',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './veterinario-ver-popup.component.html',
  styleUrl: './veterinario-ver-popup.component.scss'
})
export class VeterinarioVerPopupComponent {

  @Input() display: boolean = false

  @Input() veterinario: Veterinario = {
    nroMatricula: '',
    dni: '',
    nombreYApellido: '',
    direccion: '',
    telefono: '',
    email: '',
  }

  @Output() displayChange = new EventEmitter<boolean>()

  onClose() {
    this.display = false
    this.displayChange.emit(this.display)
  }

}
