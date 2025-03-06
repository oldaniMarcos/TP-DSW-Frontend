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
          // Calcular edad y agregarla como propiedad extra
          this.mascotasCliente[cliente.id!] = mascotas.map(mascota => ({
            ...mascota,
            edad: this.calcularEdad(mascota.fechaNac) ?? undefined  // Asegura el tipo correcto
          }));
        },
        (error) => {
          console.error(`Error al buscar mascotas del cliente ${cliente.id}:`, error);
        }
      );
    });
  }
  
  calcularEdad(fechaNac: string | undefined): number | undefined {
    if (!fechaNac) return undefined;
  
    const fechaNacimiento = new Date(fechaNac);
    if (isNaN(fechaNacimiento.getTime())) return undefined;  // Evita fechas inválidas
  
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
  
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }
  
    return edad >= 0 ? edad : undefined;  // Asegura un número válido o undefined
  }
  
  
  
}
