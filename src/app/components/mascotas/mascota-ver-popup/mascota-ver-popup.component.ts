import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Animal } from '../../../../types.js';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-mascota-ver-popup',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './mascota-ver-popup.component.html',
  styleUrl: './mascota-ver-popup.component.scss'
})
export class MascotaVerPopupComponent {

  @Input() display: boolean = false

  @Input() animal: Animal = {
    nroHistClinica: 0,
    nombre: '',
    fechaNac: '',
    edad: 0,
    idCliente: 0,
    idRaza: 0,
  }

  @Output() displayChange = new EventEmitter<boolean>()

  onClose() {
    this.display = false
    this.displayChange.emit(this.display)
  }

}
