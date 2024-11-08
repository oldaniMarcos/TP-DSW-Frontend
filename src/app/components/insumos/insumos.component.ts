import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InsumoCardComponent } from './insumo-card/insumo-card.component.js';
import { Insumo } from '../../../types.js';
import { InsumoService } from '../../services/insumo.service.js';

@Component({
  selector: 'app-insumos',
  standalone: true,
  imports: [CommonModule, InsumoCardComponent],
  templateUrl: './insumos.component.html',
  styleUrl: './insumos.component.scss'
})
export class InsumosComponent {

  insumos: Insumo[] = []
  selected: Insumo | null = null

  constructor(
    private insumoService: InsumoService
  ) { }

  ngOnInit() {
    this.findInsumos()
  }

  findInsumos(): void {
    this.insumoService.findAll().subscribe(
      (data: Insumo[]) => {
        this.insumos = data
      },
      (error) => {
        console.error('Error al buscar insumos:', error)
      }
    )
  }

  findInsumo(codInsumo: number): void {
    this.insumoService.findOne(codInsumo).subscribe(
      (data: Insumo) => {
        this.selected = data
      },
      (error) => {
        console.error(`Error al buscar insumo con id ${codInsumo}:`, error)
      }
    )
  }

  createInsumo(insumo: Insumo): void {
  this.insumoService.post(insumo).subscribe(
    (newInsumo: Insumo) => {
      this.insumos.push(newInsumo); 
    },
    (error) => {
      console.error('Error al crear un insumo:', error);
    }
  );
  }

  updateInsumo(codInsumo: number, insumo: Insumo): void {
    this.insumoService.patch(codInsumo, insumo).subscribe(
      (updatedInsumo: Insumo) => {
        const index = this.insumos.findIndex(c => c.codInsumo === codInsumo);
        if (index > -1) this.insumos[index] = updatedInsumo;
      },
      (error) => {
        console.error(`Error al actualizar insumo con código ${codInsumo}:`, error);
      }
    );
  }

  deleteInsumo(codInsumo: number): void {
    this.insumoService.delete(codInsumo).subscribe(
      () => {
        this.insumos = this.insumos.filter(c => c.codInsumo !== codInsumo);
      },
      (error) => {
        console.error(`Error al eliminar insumo con código ${codInsumo}:`, error);
      }
    );
  }

  mostrarModal: boolean = false;
  toggleModal(): void {
    this.mostrarModal = !this.mostrarModal;
  }  
  addInsumo(): void {}
}