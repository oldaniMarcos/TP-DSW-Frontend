import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RazaPopupComponent } from './raza-popup/raza-popup.component.js';
import { RazaCardComponent } from './raza-card/raza-card.component.js';
import { Raza } from '../../../types.js';
import { RazaService } from '../../services/raza.service.js';

@Component({
  selector: 'app-razas',
  standalone: true,
  imports: [CommonModule, RazaPopupComponent, RazaCardComponent],
  templateUrl: './razas.component.html',
  styleUrl: './razas.component.scss'
})
export class RazasComponent {

  razas: Raza[] = []
  selected: Raza = {
    codRaza: 0,
    descripcion: '',
    idEspecie: 0,
  }

  constructor (
    private razaService: RazaService,
  ) {}

  ngOnInit() {
    this.findRazas()
  }

  findRazas(): void {
    this.razaService.findAll().subscribe(
      (data: Raza[]) => {
        this.razas = data
      },
      (error) => {
        console.error('Error al buscar razas:', error)
      }
    )
  }

  findRaza(codRaza: number): void {
    this.razaService.findOne(codRaza).subscribe(
      (data: Raza) => {
        this.selected = data
      },
      (error) => {
        console.error(`Error al buscar raza con ID ${codRaza}:`, error)
      }
    )
  }

  createRaza(raza: Raza): void {
  this.razaService.post(raza).subscribe(
    (newRaza: Raza) => {
      this.razas.push(newRaza); 
    },
    (error) => {
      console.error('Error al crear una raza:', error);
    }
  );
  }

  updateRaza(codRaza: number, raza: Raza): void {
    this.razaService.patch(codRaza, raza).subscribe(
      (updatedRaza: Raza) => {
        const index = this.razas.findIndex(c => c.codRaza === codRaza);
        if (index > -1) this.razas[index] = updatedRaza;
      },
      (error) => {
        console.error(`Error al actualizar raza con ID ${codRaza}:`, error);
      }
    );
  }

  deleteRaza(codRaza: number): void {
    this.razaService.delete(codRaza).subscribe(
      () => {
        this.razas = this.razas.filter(c => c.codRaza !== codRaza);
      },
      (error) => {
        console.error(`Error al eliminar raza con ID ${codRaza}:`, error);
      }
    );
  }

  displayCreatePopup: boolean = false
  displayUpdatePopup: boolean = false

  //toggle popups

  toggleCreatePopup() {
    this.displayCreatePopup = true
  }

  toggleUpdatePopup(raza: Raza) {
    this.selected = raza
    this.displayUpdatePopup = true
  }

  toggleDeletePopup(raza: Raza) {
    if (!raza.codRaza) return

    this.deleteRaza(raza.codRaza)
  }

  // confirmaciones

  onConfirmCreate(raza: Raza) {
    this.createRaza(raza)
    this.displayCreatePopup = false
  }

  onConfirmUpdate(raza: Raza) {
    if (!this.selected.codRaza) return

    this.updateRaza(this.selected.codRaza, raza)
    this.displayUpdatePopup = false
  }
}
