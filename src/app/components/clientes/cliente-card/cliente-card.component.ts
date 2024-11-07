import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cliente-card',
  standalone: true,
  templateUrl: './cliente-card.component.html',
  styleUrls: ['./cliente-card.component.scss'],
})
export class ClienteCardComponent {
  @Input() dni!: string;
  @Input() nombreYApellido!: string; 
  @Input() telefono!: string;
  @Input() direccion!: string;
  @Input() email!: string;
}
