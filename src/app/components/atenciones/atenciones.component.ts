import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtencionCardComponent } from './atencion-card/atencion-card.component';

@Component({
  selector: 'app-atenciones',
  standalone: true,
  imports: [CommonModule, AtencionCardComponent],
  templateUrl: './atenciones.component.html',
  styleUrls: ['./atenciones.component.scss'],
})
export class AtencionesComponent {
  atenciones = [
    {
      mascota: 'Coco',
      fecha: '15-08-2024',
      observaciones: 'Chequeo general',
      precio: 3000,
    },
    {
      mascota: 'Jack',
      fecha: '01-08-2024',
      observaciones: 'Corte de uñas',
      precio: 3000,
    },
    {
      mascota: 'Violeta',
      fecha: '24-06-2024',
      observaciones: 'Reacción alérgica, administración de corticoides',
      precio: 8000,
    },
  ];
}
