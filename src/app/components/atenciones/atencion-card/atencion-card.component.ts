import { Component, Input } from '@angular/core';
import { Atencion } from '../../../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-atencion-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atencion-card.component.html',
  styleUrls: ['./atencion-card.component.scss'],
})
export class AtencionCardComponent {
  @Input() atencion!: Atencion;
  @Input() mascota!: string;
  @Input() fecha!: string;
  @Input() resultado!: string;
  @Input() observaciones!: string;
  @Input() precioAtencion!: number;
}
