import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { VeterinarioCardComponent } from './veterinario-card/veterinario-card.component.js';
import { Veterinario } from '../../../types.js';
import { VeterinarioService } from '../../services/veterinario.service.js';

@Component({
  selector: 'app-veterinarios',
  standalone: true,
  imports: [CommonModule, VeterinarioCardComponent],
  templateUrl: './veterinarios.component.html',
  styleUrl: './veterinarios.component.scss'
})
export class VeterinariosComponent {

  veterinarios: Veterinario[] = []
  selected: Veterinario | null = null

  constructor(
    private veterinarioService: VeterinarioService
  ) { }

  ngOnInit() {
    this.findVeterinarios()
  }

  findVeterinarios(): void {
    this.veterinarioService.findAll().subscribe(
      (data: Veterinario[]) => {
        this.veterinarios = data
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
    this.veterinarioService.put(idVeterinario, veterinario).subscribe(
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

  addVet(): void {}
}
