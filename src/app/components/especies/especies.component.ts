import { Component, OnInit } from '@angular/core';
import { EspecieCardComponent } from './especie-card/especie-card.component';
import { CommonModule } from '@angular/common';
import { Especie, Raza } from '../../../types.js';
import { EspecieService } from '../../services/especie.service.js';

@Component({
  selector: 'app-especies',
  standalone: true,
  imports: [CommonModule, EspecieCardComponent],
  templateUrl: './especies.component.html',
  styleUrl: './especies.component.scss'
})
export class EspeciesComponent implements OnInit{

  especies: Especie[] = [];
  razas: Raza[] = [];
  selected: Especie | null = null;


  constructor(
    private especieService: EspecieService
  ) { }

  ngOnInit() {
    this.findEspecies();
  }

  findEspecies(): void {
    this.especieService.findAll().subscribe(
      (data: Especie[]) => {
        this.especies = data;
      },
      (error) => {
        console.error('Error al buscar especies:', error);
      }
    );
  }

  findEspecie(codEspecie: number): void {
    this.especieService.findOne(codEspecie).subscribe(
      (data: Especie) => {
        this.selected = data;
      },
      (error) => {
        console.error(`Error al buscar especie con código ${codEspecie}:`, error);
      }
    );
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
        const index = this.especies.findIndex(e => e.codEspecie === codEspecie);
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
        this.especies = this.especies.filter(e => e.codEspecie !== codEspecie);
      },
      (error) => {
        console.error(`Error al eliminar especie con código ${codEspecie}:`, error);
      }
    );
  }

  findRazasByEspecie(codEspecie: number): void {
    this.especieService.findRazasByEspecie(codEspecie).subscribe(data => {
      this.razas = data;
    });
  }
}