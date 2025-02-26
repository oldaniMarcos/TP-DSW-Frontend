import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Animal, Atencion, Insumo, PrecioAtencion, Veterinario } from '../../../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-atencion-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atencion-card.component.html',
  styleUrls: ['./atencion-card.component.scss'],
})
export class AtencionCardComponent {
  @Input() atencion!: Atencion & { animal?: Animal; precioAtencion?: PrecioAtencion, veterinario?: Veterinario, insumos?: Insumo[] };
  @Input() mascota!: string;
  @Input() fecha!: string;
  @Input() resultado!: string;
  @Input() observaciones!: string;
  @Input() valor!: number;
  @Input() precioAtencion!: number;
  @Input() veterinario!: Veterinario;
  @Input() insumos!: Insumo;

  @Output() select = new EventEmitter<Atencion>();

  selectAtencion() {
    this.select.emit(this.atencion);
  }
}
