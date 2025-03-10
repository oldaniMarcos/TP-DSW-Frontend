import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RazaPopupComponent } from './raza-popup/raza-popup.component';
import { RazaCardComponent } from './raza-card/raza-card.component';
import { Especie, Raza } from '../../../types';
import { RazaService } from '../../services/raza.service';
import { EspecieService } from '../../services/especie.service';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-razas',
  standalone: true,
  imports: [CommonModule, RazaPopupComponent, RazaCardComponent, FormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './razas.component.html',
  styleUrl: './razas.component.scss'
})
export class RazasComponent {

  breeds: Raza[] = []
  breedsFilter: string = ''

  selected: Raza = {
    codRaza: 0,
    descripcion: '',
    idEspecie: 0,
  }

  speciess: Especie[] = []

  constructor (
    private razaService: RazaService, private especieService: EspecieService, private messageService: MessageService
  ) {}

  ngOnInit() {
    this.findRazas()
    this.findEspecies() 
  }
  
  findRazas(): void {
    this.razaService.findAll().subscribe(
      (data: Raza[]) => {
        if (this.breedsFilter) {
          const lowerCaseFilter = this.breedsFilter.toLowerCase();
          this.breeds = data.filter(raza =>
            raza.descripcion.toLowerCase().includes(lowerCaseFilter)
          );
        } else {
          this.breeds = data;
        }
      },
    )
  }

  findEspecies(): void {
    this.especieService.findAll().subscribe(
      (data: Especie[]) => {
        this.speciess = data
      },
    )
  }

  findRaza(codRaza: number): void {
    this.razaService.findOne(codRaza).subscribe(
      (data: Raza) => {
        this.selected = data
      },
    )
  }

  createRaza(raza: Raza): void {
  this.razaService.post(raza).subscribe(
    (newRaza: Raza) => {
      this.breeds.push(newRaza); 
    },
  );
  }

  updateRaza(codRaza: number, raza: Raza): void {
    this.razaService.patch(codRaza, raza).subscribe(
      (updatedRaza: Raza) => {
        const index = this.breeds.findIndex(c => c.codRaza === codRaza);
        if (index > -1) this.breeds[index] = updatedRaza;
      },
    );
  }

  deleteRaza(codRaza: number): void {
    this.razaService.delete(codRaza).subscribe(
      () => {
        this.breeds = this.breeds.filter(c => c.codRaza !== codRaza);
      },
    );
  }

  displayCreatePopup: boolean = false
  displayUpdatePopup: boolean = false

  //toggle popups

  toggleCreatePopup() {
    this.displayCreatePopup = true
  }

  toggleUpdatePopup(breed: Raza) {
    this.selected = breed
    this.displayUpdatePopup = true
  }

  toggleDeletePopup(breed: Raza) {
    if (!breed.codRaza) return

    this.deleteRaza(breed.codRaza)
  }

  // confirmaciones

  onConfirmCreate(breed: Raza) {
    this.createRaza(breed)
    this.displayCreatePopup = false

    this.messageService.add({severity: 'success', detail: 'Raza creada correctamente.', life: 2000});
  }

  onConfirmUpdate(breed: Raza) {
    if (!this.selected.codRaza) return

    this.updateRaza(this.selected.codRaza, breed)
    this.displayUpdatePopup = false

    this.messageService.add({severity: 'success', detail: 'Raza editada correctamente.', life: 2000});
  }
}
