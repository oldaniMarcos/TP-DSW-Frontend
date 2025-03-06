import { Component, Input, OnInit } from '@angular/core';
import { Animal, Cliente } from '../../../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente-mascota-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cliente-mascota-card.component.html',
  styleUrl: './cliente-mascota-card.component.scss'
})
export class ClienteMascotaCardComponent implements OnInit {
  
  @Input() cliente!: Cliente;
  @Input() mascotas: Animal[] = [];

  ngOnInit() {
    this.mascotas.forEach(mascota => {
      if (!mascota.edad && mascota.fechaNac) {
        mascota.edad = this.calcularEdad(mascota.fechaNac);
      }
    });
  }

  calcularEdad(fechaNac: string): number | undefined {
    const fechaNacimiento = new Date(fechaNac);
    if (isNaN(fechaNacimiento.getTime())) return undefined;  // Evita fechas inválidas

    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }

    return edad >= 0 ? edad : undefined;
  }
}
