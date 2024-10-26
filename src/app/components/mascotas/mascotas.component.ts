import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para usar *ngFor
import { MascotaCardComponent } from './mascota-card/mascota-card.component';
import { RegistrarMascotaComponent } from './registrar-mascota/registrar-mascota.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mascotas',
  standalone: true,
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.scss'],
  imports: [
    MascotaCardComponent,
    RegistrarMascotaComponent,
    CommonModule,
    FormsModule,
  ],
})
export class MascotasComponent {
  mascotas = [
    { nombre: 'Coco', tipo: 'Perro | Mixto', edad: '16 años' },
    { nombre: 'Bianca', tipo: 'Perro | Labrador', edad: '10 años' },
    { nombre: 'Jack', tipo: 'Perro | Mixto', edad: '8 años' },
    { nombre: 'Violeta', tipo: 'Perro | Mixto', edad: '5 años' },
  ];
  mostrarModal: boolean = false;
  toggleModal(): void {
    this.mostrarModal = !this.mostrarModal;
  }
}
