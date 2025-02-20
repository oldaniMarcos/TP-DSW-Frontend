import { Component, Input } from '@angular/core';
import { Animal, Cliente } from '../../../../types.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente-mascota-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cliente-mascota-card.component.html',
  styleUrl: './cliente-mascota-card.component.scss'
})
export class ClienteMascotaCardComponent {
  
    @Input() cliente!: Cliente
    @Input() mascotas: Animal[] = []

  
}
