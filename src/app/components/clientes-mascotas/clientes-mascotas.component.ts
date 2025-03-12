import { Component } from '@angular/core';
import { Animal, Cliente } from '../../../types';
import { ClienteService } from '../../services/cliente.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteMascotaCardComponent } from './cliente-mascota-card/cliente-mascota-card.component';
import { AnimalService } from '../../services/animal.service';

@Component({
  selector: 'app-clientes-mascotas',
  standalone: true,
  imports: [CommonModule, FormsModule, ClienteMascotaCardComponent],
  templateUrl: './clientes-mascotas.component.html',
  styleUrl: './clientes-mascotas.component.scss'
})
export class ClientesMascotasComponent {

  clients: Cliente[] = []
  clientPets: { [id: number]: Animal[] } = {}

  dniFilter: string = '';

  constructor(
    private clienteService: ClienteService,
    private animalService: AnimalService
  ) { }

  ngOnInit() {
    this.findClientes()
  }

  findClientes(): void {
    this.clienteService.findAll().subscribe(
      (data: Cliente[]) => {

        if (this.dniFilter) {
          this.clients = data.filter(cliente => cliente.dni.includes(this.dniFilter) && cliente.rol === 'cliente')
          this.findMascotas()
        } else {
          this.clients = data.filter(cliente => cliente.rol === 'cliente')
          this.findMascotas()
        }
      },
    );
  }

  findMascotas(): void {
    this.clients.forEach(cliente => {
      this.animalService.findByClienteId(cliente.id!).subscribe(
        (pets: Animal[]) => {
          this.clientPets[cliente.id!] = pets.map(pet => ({
            ...pet,
            edad: this.calculateAge(pet.fechaNac) ?? undefined 
          }));
        },
      );
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
