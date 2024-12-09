import { Component, Input } from '@angular/core';
import { Animal } from '../../../../types';

@Component({
  selector: 'app-mascota-card',
  standalone: true,
  templateUrl: './mascota-card.component.html',
  styleUrls: ['./mascota-card.component.scss'],
})
export class MascotaCardComponent {
  @Input() animal!: Animal;
}
