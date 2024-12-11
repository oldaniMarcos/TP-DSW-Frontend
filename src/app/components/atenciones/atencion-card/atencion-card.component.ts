import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-atencion-card',
  standalone: true,
  templateUrl: './atencion-card.component.html',
  styleUrls: ['./atencion-card.component.scss'],
})
export class AtencionCardComponent {
  @Input() mascota!: string;
  @Input() fecha!: string;
  @Input() observaciones!: string;
  @Input() precioAtencion!: number;
}
