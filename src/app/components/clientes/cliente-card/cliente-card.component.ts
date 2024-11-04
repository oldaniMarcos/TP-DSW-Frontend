import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cliente-card',
  standalone: true,
  templateUrl: './cliente-card.component.html',
  styleUrls: ['./cliente-card.component.scss'],
})
export class ClienteCardComponent {
  @Input() dni!: number;
  @Input() nombre!: string;
  @Input() apellido!: string;
  @Input() telefono!: number;
  @Input() direccion!: string;
  @Input() email!: string;
}