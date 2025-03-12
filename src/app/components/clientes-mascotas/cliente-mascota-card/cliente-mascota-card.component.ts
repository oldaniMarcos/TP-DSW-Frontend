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
  @Input() pets: Animal[] = [];

  ngOnInit() {
    this.pets.forEach(pet => {
      if (!pet.edad && pet.fechaNac) {
        pet.edad = this.calculateAge(pet.fechaNac);
      }
    });
  }

  calculateAge(date: string | undefined): number | undefined {
    if (!date) return undefined;

    const birthDate = new Date(date);
    if (isNaN(birthDate.getTime())) return undefined;
  
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
  
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age >= 0 ? age : undefined; 
  }
}
