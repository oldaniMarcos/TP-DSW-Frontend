import { Component } from '@angular/core';
import { EspecieCardComponent } from './especie-card/especie-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-especies',
  standalone: true,
  imports: [CommonModule, EspecieCardComponent],
  templateUrl: './especies.component.html',
  styleUrl: './especies.component.scss'
})
export class EspeciesComponent {
  especies = [
    {
      descripcion: "Perro",
    },
    {
      descripcion: "Gato",
    },
        {
      descripcion: "Loro",
    },
        {
      descripcion: "Conejo",
    },
  ];  
}
