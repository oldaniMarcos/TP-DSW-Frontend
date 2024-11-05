import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-insumo-card',
  standalone: true,
  imports: [],
  templateUrl: './insumo-card.component.html',
  styleUrl: './insumo-card.component.scss'
})
export class InsumoCardComponent {
  @Input() idInsumo!: number
  @Input() descripcion!: string
  @Input() stock!: number
  @Input() fechaVencimiento!: string

}
