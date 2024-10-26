import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mascota-card',
  standalone: true,
  templateUrl: './mascota-card.component.html',
  styleUrls: ['./mascota-card.component.scss'],
})
export class MascotaCardComponent {
  @Input() mascota!: { nombre: string; tipo: string; edad: string };
}
