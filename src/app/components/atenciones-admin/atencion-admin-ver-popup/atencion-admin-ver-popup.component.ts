import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Atencion, Animal, PrecioAtencion, Veterinario, Insumo } from '../../../../types';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-atencion-admin-ver-popup',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule],
  templateUrl: './atencion-admin-ver-popup.component.html',
  styleUrls: ['./atencion-admin-ver-popup.component.scss'],
})
export class AtencionAdminVerPopupComponent {
  @Input() atencion!: Atencion & { animal?: Animal; precioAtencion?: PrecioAtencion, veterinario?: Veterinario, insumos?: Insumo[] };
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();

  onClose() {
    this.displayChange.emit(false);
  }
}
