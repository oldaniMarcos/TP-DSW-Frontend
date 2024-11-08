import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-especie-card',
  standalone: true,
  templateUrl: './especie-card.component.html',
  styleUrls: ['./especie-card.component.scss'],
})
export class EspecieCardComponent {
  @Input() descripcion!: string;

  // Eventos de salida para las acciones de editar, eliminar y ver razas
  @Output() editarEspecie = new EventEmitter<void>();
  @Output() eliminarEspecie = new EventEmitter<void>();
  @Input() codEspecie!: number;
  @Output() verRazas = new EventEmitter<number>();

  // Métodos para emitir los eventos correspondientes
  editar() {
    this.editarEspecie.emit();
  }

  eliminar() {
    this.eliminarEspecie.emit();
  }

  onVerRazas() {
    this.verRazas.emit(this.codEspecie);
  }
}
