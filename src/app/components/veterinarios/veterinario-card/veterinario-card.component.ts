import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-veterinario-card',
  standalone: true,
  imports: [],
  templateUrl: './veterinario-card.component.html',
  styleUrl: './veterinario-card.component.scss'
})
export class VeterinarioCardComponent {
  @Input() idVeterinario!: number
  @Input() nroMatricula!: string
  @Input() dni!: string
  @Input() nombreYApellido!: string
  @Input() telefono!: string
  @Input() direccion!: string
  @Input() email!: string
}
