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
        mascota.edad = this.calculateAge(mascota.fechaNac);
      }
    });
  }

  calculateAge(birthDat: string | undefined): number | undefined {
    if (!birthDat) return undefined;

    const birthDate = new Date(birthDat);
    if (isNaN(birthDate.getTime())) return undefined;  // Evita fechas inválidas
  
    const hoy = new Date();
    let edad = hoy.getFullYear() - birthDate.getFullYear();
    const mes = hoy.getMonth() - birthDate.getMonth();
  
    if (mes < 0 || (mes === 0 && hoy.getDate() < birthDate.getDate())) {
      edad--;
    }
  
    return edad >= 0 ? edad : undefined;  // Asegura un número válido o undefined
  }
}
