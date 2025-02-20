import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MascotaCardComponent } from './mascota-card/mascota-card.component.js';
import { Animal } from '../../../types.js';
import { MascotaPopupComponent } from './mascota-popup/mascota-popup.component.js';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MascotaVerPopupComponent } from './mascota-ver-popup/mascota-ver-popup.component.js';
import { AnimalService } from '../../services/animal.service.js';

@Component({
  selector: 'app-veterinarios',
  standalone: true,
imports: [CommonModule, MascotaCardComponent, MascotaPopupComponent, MascotaVerPopupComponent, ButtonModule, FormsModule],
  templateUrl: './mascotas.component.html',
  styleUrl: './mascotas.component.scss'
})
export class MascotasComponent {

  mascotas: Animal[] = []
  selected: Animal = {
    nroHistClinica: 0,
    nombre: '',
    fechaNac: '',
    edad: 0,
    idCliente: 0,
    idRaza: 0
  }

  mascotasFiltradas: Animal[] = []
  selectedFiltrado: Animal = {
    nroHistClinica: 0,
    nombre: '',
    fechaNac: '',
    edad: 0,
    idCliente: 0,
    idRaza: 0
  }

  nomFiltro: string = ''
  idClienteLogueado: number | null = null;

  constructor(
    private animalService: AnimalService
  ) {
    const idCliente = localStorage.getItem('id');
    this.idClienteLogueado = idCliente ? parseInt(idCliente, 10) : null;
    console.log('ID Cliente Logueado:', this.idClienteLogueado);
   }

  ngOnInit() {
    this.findMascotas()
  }

  findMascotas(): void {
    // Asegúrate de que idClienteLogueado no sea null antes de hacer la llamada a la API
    if (this.idClienteLogueado !== null) {
      this.animalService.findByClienteId(this.idClienteLogueado).subscribe(
        (data: Animal[]) => {
          this.mascotas = data; // Ya no necesitas filtrar por idCliente
  
          // Si hay un filtro por nroHistoriaClinica, aplicar también
          if (this.nomFiltro) {
            this.mascotas = this.mascotas.filter(animal => 
              animal.nroHistClinica !== undefined && 
              animal.nroHistClinica.toString().includes(this.nomFiltro)
            );
          }
          console.log(this.mascotas); // Cambié 'data' por 'this.mascotas' para mostrar los mascotas filtrados
        },
        (error) => {
          console.error('Error al buscar mascotas:', error);
        }  
        );
      } else {
        console.error('ID del cliente logueado es null. No se puede buscar animales.');
      }
  
    }
    
  findMascota(nroHistClinica: number): void {
    this.animalService.findOne(nroHistClinica).subscribe(
      (data: Animal) => {
        this.selected = data
      },
      (error) => {
        console.error(`Error al buscar mascota con id ${nroHistClinica}:`, error)
      }
    )
  }

  createMascota(animal: Animal): void {
  this.animalService.post(animal).subscribe(
    (newMascota: Animal) => {
      this.mascotas.push(newMascota); 
    },
    (error) => {
      console.error('Error al crear una mascota:', error);
    }
  );
  }

  updateMascota(nroHistClinica: number, animal: Animal): void {
    this.animalService.patch(nroHistClinica, animal).subscribe(
      (updatedMascota: Animal) => {
        const index = this.mascotas.findIndex(c => c.nroHistClinica === nroHistClinica);
        if (index > -1) this.mascotas[index] = updatedMascota;
      },
      (error) => {
        console.error(`Error al actualizar animal con id ${nroHistClinica}:`, error);
      }
    );
  }

  deleteMascota(nroHistClinica: number): void {
    this.animalService.delete(nroHistClinica).subscribe(
      () => {
        this.mascotas = this.mascotas.filter(c => c.nroHistClinica !== nroHistClinica);
      },
      (error) => {
        console.error(`Error al eliminar mascota con id ${nroHistClinica}:`, error);
      }
    );
  }

  displayCreatePopup: boolean = false
  displayUpdatePopup: boolean = false
  displaySelectPopup: boolean = false


  //toggle popups

  toggleCreatePopup() {
    this.displayCreatePopup = true
  }

  toggleUpdatePopup(animal: Animal) {
    this.selected = animal
    this.displayUpdatePopup = true
  }

  toggleSelectPopup(animal: Animal) {
    this.selected = animal
    this.displaySelectPopup = true
  }

  toggleDeletePopup(animal: Animal) {
    if (!animal.nroHistClinica) return

    this.deleteMascota(animal.nroHistClinica)
  }

  // confirmaciones

  onConfirmCreate(animal: Animal) {
    this.createMascota(animal)
    this.displayCreatePopup = false
  }

  onConfirmUpdate(animal: Animal) {
    if (!this.selected.nroHistClinica) return

    this.updateMascota(this.selected.nroHistClinica, animal)
    this.displayUpdatePopup = false
  }
}
