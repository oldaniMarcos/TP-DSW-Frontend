import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cliente-card',
  standalone: true,
  templateUrl: './cliente-card.component.html',
  styleUrls: ['./cliente-card.component.scss'],
})
export class ClienteCardComponent {
  @Input() dni!: number;

  //no usado ahora
  @Input() nombre!: string;   //el cliente tiene un atributo nombreYApellido
  @Input() apellido!: string;
  @Input() telefono!: number;
  @Input() direccion!: string;
  @Input() email!: string;
}
