import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EspecieCardComponent } from './especie-card/especie-card.component.js';
import { Especie, Raza } from '../../../types.js';
import { EspecieService } from '../../services/especie.service.js';
import { EspeciePopupComponent } from './especie-popup/especie-popup.component.js';
import { ButtonModule } from 'primeng/button';
import { RazaService } from '../../services/raza.service.js';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-especies',
  standalone: true,
  imports: [CommonModule, EspecieCardComponent, EspeciePopupComponent, ButtonModule, RouterLink],
  templateUrl: './especies.component.html',
  styleUrl: './especies.component.scss'
})
export class EspeciesComponent {

  especies: Especie[] = []
  razas: Raza[] = []
  selected: Especie = {
    codEspecie: 0,
    descripcion: '',
  }

  constructor(
    private especieService: EspecieService,
    private razaService: RazaService
  ) { }

  ngOnInit() {
    this.findEspecies()
    this.findRazas()
  }

  findEspecies(): void {
    this.especieService.findAll().subscribe(
      (data: Especie[]) => {
        this.especies = data
      },
      (error) => {
        console.error('Error al buscar especies:', error)
      }
    )
  }

  findEspecie(codEspecie: number): void {
    this.especieService.findOne(codEspecie).subscribe(
      (data: Especie) => {
        this.selected = data
      },
      (error) => {
        console.error(`Error al buscar especie con id ${codEspecie}:`, error)
      }
    )
  }

  createEspecie(especie: Especie): void {
  this.especieService.post(especie).subscribe(
    (newEspecie: Especie) => {
      this.especies.push(newEspecie); 
    },
    (error) => {
      console.error('Error al crear un especie:', error);
    }
  );
  }

  updateEspecie(codEspecie: number, especie: Especie): void {
    this.especieService.patch(codEspecie, especie).subscribe(
      (updatedEspecie: Especie) => {
        const index = this.especies.findIndex(c => c.codEspecie === codEspecie);
        if (index > -1) this.especies[index] = updatedEspecie;
      },
      (error) => {
        console.error(`Error al actualizar especie con código ${codEspecie}:`, error);
      }
    );
  }

  deleteEspecie(codEspecie: number): void {
    this.especieService.delete(codEspecie).subscribe(
      () => {
        this.especies = this.especies.filter(c => c.codEspecie !== codEspecie);
      },
      (error) => {
        console.error(`Error al eliminar especie con código ${codEspecie}:`, error);
      }
    );
  }

  displayCreatePopup: boolean = false
  displayUpdatePopup: boolean = false

  //toggle popups

  toggleCreatePopup() {
    this.displayCreatePopup = true
  }

  toggleUpdatePopup(especie: Especie) {
    this.selected = especie
    this.displayUpdatePopup = true
  }

  toggleDeletePopup(especie: Especie) {
    if (!especie.codEspecie) return

    this.deleteEspecie(especie.codEspecie)
  }

  // confirmaciones

  onConfirmCreate(especie: Especie) {
    this.createEspecie(especie)
    this.displayCreatePopup = false
  }

  onConfirmUpdate(especie: Especie) {
    if (!this.selected.codEspecie) return

    this.updateEspecie(this.selected.codEspecie, especie)
    this.displayUpdatePopup = false
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

  //no usado por el momento, mejor hacer seccion de razas y filtrar ahi
  cargarRazas(codEspecie: number) {

    console.log(this.razas);

  }
}
