import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cliente } from '../../../../types.js';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-cliente-ver-popup',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './cliente-ver-popup.component.html',
  styleUrl: './cliente-ver-popup.component.scss'
})
export class ClienteVerPopupComponent {

  @Input() display: boolean = false

  @Input() cliente: Cliente = {
  dni: '',
  nombreYApellido: '',
  telefono: '',
  direccion: '',
  email: '',
  usuario: '',
  password: '',
  }

  @Output() displayChange = new EventEmitter<boolean>()

  onClose() {
    this.display = false
    this.displayChange.emit(this.display)
  }
}
