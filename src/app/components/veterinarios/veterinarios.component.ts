import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { VeterinarioCardComponent } from './veterinario-card/veterinario-card.component.js';

@Component({
  selector: 'app-veterinarios',
  standalone: true,
  imports: [CommonModule, VeterinarioCardComponent],
  templateUrl: './veterinarios.component.html',
  styleUrl: './veterinarios.component.scss'
})
export class VeterinariosComponent {
  veterinarios = [
    {
      idVeterinario: 1,
      nroMatricula: 100000,
      dni: "42575798",    //pasar a string en el modelo
      nombreYApellido: "Luis Escobar",
      telefono: "+54 336 4558899",
      direccion: "Los Tilos 1500",
      email: "test@gmail.com",
    },
    {
      idVeterinario: 2,
      nroMatricula: 100001,
      dni: "45493242",
      nombreYApellido: "Laura Torres",
      telefono: "+54 341 115533",
      direccion: "Zeballos 1400",
      email: "test@gmail.com",
    },
  ]

  addVet(): void {}
}
