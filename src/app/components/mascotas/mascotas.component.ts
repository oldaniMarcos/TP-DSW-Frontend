import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para usar *ngFor
import { MascotaCardComponent } from './mascota-card/mascota-card.component';
import { RegistrarMascotaComponent } from './registrar-mascota/registrar-mascota.component';
import { FormsModule } from '@angular/forms';
import { Animal } from '../../../types';
import { AnimalService } from '../../services/animal.service';

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

  animales: Animal[] = []
  selected: Animal = {
    nroHistClinica: 0,
    nombre: '',
    fechaNac: '',
    edad: 0,
    idCliente: 0,
    idRaza: 0,
  };

  nroHistFiltro: string = '';
  idClienteLogueado: number | null = null;

  constructor(private animalService: AnimalService) {
    // Obtener el ID del cliente logueado desde localStorage
    const idCliente = localStorage.getItem('id');
    this.idClienteLogueado = idCliente ? parseInt(idCliente, 10) : null; // Convertir a número
    console.log('ID Cliente Logueado:', this.idClienteLogueado); // Verifica aquí
  }

  ngOnInit() {
    console.log('Buscando animales...');
    this.findAnimales();
  }

  findAnimales(): void {
    // Asegúrate de que idClienteLogueado no sea null antes de hacer la llamada a la API
    if (this.idClienteLogueado !== null) {
      this.animalService.findByClienteId(this.idClienteLogueado).subscribe(
        (data: Animal[]) => {
          this.animales = data; // Ya no necesitas filtrar por idCliente
  
          // Si hay un filtro por nroHistoriaClinica, aplicar también
          if (this.nroHistFiltro) {
            this.animales = this.animales.filter(animal => 
              animal.nroHistClinica !== undefined && 
              animal.nroHistClinica.toString().includes(this.nroHistFiltro)
            );
          }
          console.log(this.animales); // Cambié 'data' por 'this.animales' para mostrar los animales filtrados
        },
        (error) => {
          console.error('Error al buscar animales:', error);
        }
      );
    } else {
      console.error('ID del cliente logueado es null. No se puede buscar animales.');
    }
  }

  mostrarModal: boolean = false;
  toggleModal(): void {
    this.mostrarModal = !this.mostrarModal;
  }

  onConfirmRegistrarMascota(nuevaMascota: Animal): void {
    this.animalService.post(nuevaMascota).subscribe(
      (animalCreado: Animal) => {
        this.animales.push(animalCreado); // Agrega la nueva mascota a la lista
        this.toggleModal(); // Cierra el modal
      },
      (error) => {
        console.error('Error al registrar la mascota:', error);
      }
    );
  }

  deleteMascota(nroHistClinica: number): void {
    console.log('borrandoooo');
    this.animalService.delete(nroHistClinica).subscribe(
      () => {
        this.animales = this.animales.filter(c => c.nroHistClinica !== nroHistClinica);
      },
      (error) => {
        console.error(`Error al eliminar mascota con número ${nroHistClinica}:`, error);
      }
    );
  }

  toggleDeletePopup(animal: Animal) {
    if (animal.nroHistClinica !== undefined) {
      this.deleteMascota(animal.nroHistClinica);
    } else {
      console.error('No se puede eliminar: Número de historia clínica indefinido.');
    }
  }
  
}
