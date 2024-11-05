import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InsumoCardComponent } from './insumo-card/insumo-card.component.js';

@Component({
  selector: 'app-insumos',
  standalone: true,
  imports: [CommonModule, InsumoCardComponent],
  templateUrl: './insumos.component.html',
  styleUrl: './insumos.component.scss'
})
export class InsumosComponent {
  insumos = [
    {
      idInsumo: 1,
      descripcion: 'Vacuna antirrábica',
      stock: 100,
      fechaVencimiento: '31-12-2024',
    },
        {
      idInsumo: 2,
      descripcion: 'Vacuna quíntuple',
      stock: 100,
      fechaVencimiento: '31-12-2024',
    },
        {
      idInsumo: 3,
      descripcion: 'Jeringas',
      stock: 100,
      fechaVencimiento: '31-12-2024',
    },
        {
      idInsumo: 4,
      descripcion: 'Guantes de latex',
      stock: 100,
      fechaVencimiento: '31-12-2024',
    },
  ]

  addInsumo(): void {}
}
