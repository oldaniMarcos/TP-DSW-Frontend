import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EspecieCardComponent } from './especie-card/especie-card.component.js';
import { Especie, Raza } from '../../../types.js';
import { EspecieService } from '../../services/especie.service.js';
import { EspeciePopupComponent } from './especie-popup/especie-popup.component.js';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-especies',
  standalone: true,
  imports: [CommonModule, EspecieCardComponent, EspeciePopupComponent, ButtonModule, RouterLink, FormsModule, ToastModule],
  providers: [MessageService],
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

  especieFiltro: string = '';

  constructor(
    private especieService: EspecieService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.findEspecies()
  }

  findEspecies(): void {
    this.especieService.findAll().subscribe(
      (data: Especie[]) => {
        if (this.especieFiltro) {
          const filtroLowerCase = this.especieFiltro.toLowerCase();
          this.especies = data.filter(especie =>
            especie.descripcion.toLowerCase().includes(filtroLowerCase)
          );
        } else {
          this.especies = data;
        }
      },
      (error) => {
        console.error('Error al buscar especies:', error);
      }
    );
  }

  findEspecie(codEspecie: number): void {
    this.especieService.findOne(codEspecie).subscribe(
      (data: Especie) => {
        this.selected = data
      },
      (error) => {
        console.error(`Error al buscar especie con ID ${codEspecie}:`, error)
      }
    )
  }

  createEspecie(especie: Especie): void {
  this.especieService.post(especie).subscribe(
    (newEspecie: Especie) => {
      this.especies.push(newEspecie); 
    },
    (error) => {
      console.error('Error al crear una especie:', error);
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

    this.messageService.add({severity: 'success', detail: 'Especie creada correctamente.', life: 2000});
  }

  onConfirmUpdate(especie: Especie) {
    if (!this.selected.codEspecie) return

    this.updateEspecie(this.selected.codEspecie, especie)
    this.displayUpdatePopup = false

    this.messageService.add({severity: 'success', detail: 'Especie editada correctamente.', life: 2000});
  }
}
