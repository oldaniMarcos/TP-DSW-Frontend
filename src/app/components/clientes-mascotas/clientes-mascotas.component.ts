import { Component } from '@angular/core';
import { Animal, Cliente } from '../../../types.js';
import { ClienteService } from '../../services/cliente.service.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteMascotaCardComponent } from './cliente-mascota-card/cliente-mascota-card.component.js';
import { AnimalService } from '../../services/animal.service.js';

@Component({
  selector: 'app-clientes-mascotas',
  standalone: true,
  imports: [CommonModule, FormsModule, ClienteMascotaCardComponent],
  templateUrl: './clientes-mascotas.component.html',
  styleUrl: './clientes-mascotas.component.scss'
})
export class ClientesMascotasComponent {

  clientes: Cliente[] = []
  mascotasCliente: { [id: number]: Animal[] } = {}

  dniFiltro: string = '';

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

        if (this.dniFiltro) {
          this.clientes = data.filter(cliente => cliente.dni.includes(this.dniFiltro) && cliente.rol === 'cliente')
          this.findMascotas()
        } else {
          this.clientes = data.filter(cliente => cliente.rol === 'cliente')
          this.findMascotas()
        }
      },
      (error) => {
        console.error('Error al buscar clientes:', error);
      }
    );
  }

  findMascotas(): void {
    this.clientes.forEach(cliente => {

      this.animalService.findByClienteId(cliente.id!).subscribe(
        (mascotas: Animal[]) => {
          this.mascotasCliente[cliente.id!] = mascotas
        },
        (error) => {
          console.error(`Error al buscar mascotas del cliente ${cliente.id}:`, error)
        }
      );

    });
    
  }
  
}
