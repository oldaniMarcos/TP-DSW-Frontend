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
  mascotasCliente: { [id: number]: Animal[] } = {}

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
        (mascotas: Animal[]) => {
          this.mascotasCliente[cliente.id!] = mascotas.map(mascota => ({
            ...mascota,
            edad: this.calculateAge(mascota.fechaNac) ?? undefined 
          }));
        },
      );
    });
  }
  
  calculateAge(birthDat: string | undefined): number | undefined {
    if (!birthDat) return undefined;
  
    const birthDate = new Date(birthDat);
    if (isNaN(birthDate.getTime())) return undefined;
  
    const hoy = new Date();
    let edad = hoy.getFullYear() - birthDate.getFullYear();
    const mes = hoy.getMonth() - birthDate.getMonth();
  
    if (mes < 0 || (mes === 0 && hoy.getDate() < birthDate.getDate())) {
      edad--;
    }
  
    return edad >= 0 ? edad : undefined;
  }
  
  
  
}
