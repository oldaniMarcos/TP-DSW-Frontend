import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MascotaCardComponent } from './mascota-card/mascota-card.component';
import { Animal } from '../../../types';
import { MascotaPopupComponent } from './mascota-popup/mascota-popup.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MascotaVerPopupComponent } from './mascota-ver-popup/mascota-ver-popup.component';
import { AnimalService } from '../../services/animal.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-veterinarios',
  standalone: true,
imports: [CommonModule, MascotaCardComponent, MascotaPopupComponent, MascotaVerPopupComponent, ButtonModule, FormsModule, ToastModule],
providers: [MessageService],
  templateUrl: './mascotas.component.html',
  styleUrl: './mascotas.component.scss'
})
export class MascotasComponent {

  mascotas: Animal[] = []
  selected: Animal = {
    nroHistClinica: 0,
    nombre: '',
    fechaNac: '',
    idCliente: 0,
    idRaza: 0
  }

  nomFilter: string = ''
  loggedClientID: number | null = null;

  constructor(
    private animalService: AnimalService,
    private messageService: MessageService
  ) {
    const clientID = localStorage.getItem('id');
    this.loggedClientID = clientID ? parseInt(clientID, 10) : null;
   }

  ngOnInit() {
    this.findMascotas()
  }

  findMascotas(): void {
    if (this.loggedClientID !== null) {
      this.animalService.findByClienteId(this.loggedClientID).subscribe(
        (data: Animal[]) => {
                if (this.nomFilter) {
                  const lowerCaseFilter = this.nomFilter.toLowerCase();
                  this.mascotas = data.filter(mascota =>
                    mascota.nombre.toLowerCase().includes(lowerCaseFilter)
                  );
                } else {
                  this.mascotas = data;
                }
              }, 
        );
      }
    }
    
  findMascota(nroHistClinica: number): void {
    this.animalService.findOne(nroHistClinica).subscribe(
      (data: Animal) => {
        this.selected = data
      },
    )
  }

  createMascota(animal: Animal): void {
  this.animalService.post(animal).subscribe(
    (newMascota: Animal) => {
      this.mascotas.push(newMascota); 
    },
  );
  }

  updateMascota(nroHistClinica: number, animal: Animal): void {
    this.animalService.patch(nroHistClinica, animal).subscribe(
      (updatedMascota: Animal) => {
        const index = this.mascotas.findIndex(c => c.nroHistClinica === nroHistClinica);
        if (index > -1) this.mascotas[index] = updatedMascota;
      },
    );
  }

  deleteMascota(nroHistClinica: number): void {
    this.animalService.delete(nroHistClinica).subscribe(
      () => {
        this.mascotas = this.mascotas.filter(c => c.nroHistClinica !== nroHistClinica);
      },
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

    this.messageService.add({severity:'success', detail:'Mascota creada correctamente.', life: 2000});
  }

  onConfirmUpdate(animal: Animal) {
    if (!this.selected.nroHistClinica) return

    this.updateMascota(this.selected.nroHistClinica, animal)
    this.displayUpdatePopup = false

    this.messageService.add({severity:'success', detail:'Mascota editada correctamente.', life: 2000});
  }
}
