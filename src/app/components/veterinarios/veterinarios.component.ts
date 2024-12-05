import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { VeterinarioCardComponent } from './veterinario-card/veterinario-card.component.js';
import { Veterinario } from '../../../types.js';
import { VeterinarioService } from '../../services/veterinario.service.js';
import { VeterinarioPopupComponent } from './veterinario-popup/veterinario-popup.component.js';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-veterinarios',
  standalone: true,
  imports: [CommonModule, VeterinarioCardComponent, VeterinarioPopupComponent, ButtonModule, FormsModule],
  templateUrl: './veterinarios.component.html',
  styleUrl: './veterinarios.component.scss'
})
export class VeterinariosComponent {

  veterinarios: Veterinario[] = []
  selected: Veterinario = {
    idVeterinario: 0,
    nroMatricula: '',
    dni: '',
    nombreYApellido: '',
    direccion: '',
    telefono: '',
    email: '',
  }

  veterinariosFiltrados: Veterinario[] = []
  selectedFiltrado: Veterinario = {
    idVeterinario: 0,
    nroMatricula: '',
    dni: '',
    nombreYApellido: '',
    direccion: '',
    telefono: '',
    email: '',
  }

  matFiltro: string = ''

  constructor(
    private veterinarioService: VeterinarioService
  ) { }

  ngOnInit() {
    this.findVeterinarios()
  }

  findVeterinarios(): void {
    this.veterinarioService.findAll().subscribe(
      (data: Veterinario[]) => {
        if (this.matFiltro) {
          this.veterinarios = data.filter(veterinario => veterinario.nroMatricula.includes(this.matFiltro))
        } else {
          this.veterinarios = data
        }
      },
      (error) => {
        console.error('Error al buscar veterinarios:', error)
      }
    )
  }

  findVeterinario(idVeterinario: number): void {
    this.veterinarioService.findOne(idVeterinario).subscribe(
      (data: Veterinario) => {
        this.selected = data
      },
      (error) => {
        console.error(`Error al buscar veterinario con id ${idVeterinario}:`, error)
      }
    )
  }

  createVeterinario(veterinario: Veterinario): void {
  this.veterinarioService.post(veterinario).subscribe(
    (newVeterinario: Veterinario) => {
      this.veterinarios.push(newVeterinario); 
    },
    (error) => {
      console.error('Error al crear un veterinario:', error);
    }
  );
  }

  updateVeterinario(idVeterinario: number, veterinario: Veterinario): void {
    this.veterinarioService.patch(idVeterinario, veterinario).subscribe(
      (updatedVeterinario: Veterinario) => {
        const index = this.veterinarios.findIndex(c => c.idVeterinario === idVeterinario);
        if (index > -1) this.veterinarios[index] = updatedVeterinario;
      },
      (error) => {
        console.error(`Error al actualizar veterinario con id ${idVeterinario}:`, error);
      }
    );
  }

  deleteVeterinario(idVeterinario: number): void {
    this.veterinarioService.delete(idVeterinario).subscribe(
      () => {
        this.veterinarios = this.veterinarios.filter(c => c.idVeterinario !== idVeterinario);
      },
      (error) => {
        console.error(`Error al eliminar veterinario con id ${idVeterinario}:`, error);
      }
    );
  }

  displayCreatePopup: boolean = false
  displayUpdatePopup: boolean = false

  //toggle popups

  toggleCreatePopup() {
    this.displayCreatePopup = true
  }

  toggleUpdatePopup(veterinario: Veterinario) {
    this.selected = veterinario
    this.displayUpdatePopup = true
  }

  toggleDeletePopup(veterinario: Veterinario) {
    if (!veterinario.idVeterinario) return

    this.deleteVeterinario(veterinario.idVeterinario)
  }

  // confirmaciones

  onConfirmCreate(veterinario: Veterinario) {
    this.createVeterinario(veterinario)
    this.displayCreatePopup = false
  }

  onConfirmUpdate(veterinario: Veterinario) {
    if (!this.selected.idVeterinario) return

    this.updateVeterinario(this.selected.idVeterinario, veterinario)
    this.displayUpdatePopup = false
  }
}
