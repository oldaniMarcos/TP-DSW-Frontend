import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar-mascota',
  standalone: true,
  templateUrl: './registrar-mascota.component.html',
  styleUrls: ['./registrar-mascota.component.scss'],
  imports: [FormsModule],
})
export class RegistrarMascotaComponent {
  @Output() cerrarModal = new EventEmitter<void>();

  cerrar(): void {
    this.cerrarModal.emit();
  }
}
