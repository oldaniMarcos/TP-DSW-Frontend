import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InsumoCardComponent } from './insumo-card/insumo-card.component.js';
import { Insumo, TipoInsumo } from '../../../types.js';
import { InsumoService } from '../../services/insumo.service.js';
import { InsumoPopupComponent } from './insumo-popup/insumo-popup.component.js';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InsumoVerPopupComponent } from './insumo-ver-popup/insumo-ver-popup.component.js';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-insumos',
  standalone: true,
  imports: [CommonModule, InsumoCardComponent, InsumoPopupComponent, InsumoVerPopupComponent, ButtonModule, FormsModule, RouterLink],
  templateUrl: './insumos.component.html',
  styleUrl: './insumos.component.scss'
})
export class InsumosComponent {

  insumos: Insumo[] = []
  selected: Insumo = {
    codInsumo: 0,
    descripcion: '',
    stock: 0,
    fechaVencimiento: '',
    idTipoInsumo: 0,
  }

  insumoFiltro: string = '';

  tipoInsumo: TipoInsumo = {
    codTipoInsumo: 0,
    descripcion: '',
  }

  constructor(
    private insumoService: InsumoService
  ) { }

  ngOnInit() {
    this.findInsumos()
  }

  findInsumos(): void {
    this.insumoService.findAll().subscribe(
      (data: Insumo[]) => {
        if (this.insumoFiltro) {
          const filtroLowerCase = this.insumoFiltro.toLowerCase();
          this.insumos = data.filter(insumo =>
            insumo.descripcion.toLowerCase().includes(filtroLowerCase)
          );
        } else {
          this.insumos = data;
        }
      },
      (error) => {
        console.error('Error al buscar insumos:', error);
      }
    );
  }

  findInsumo(codInsumo: number): void {
    this.insumoService.findOne(codInsumo).subscribe(
      (data: Insumo) => {
        this.selected = data
      },
      (error) => {
        console.error(`Error al buscar insumo con código ${codInsumo}:`, error)
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

  findTipoInsumo(codInsumo: number): void {
    this.insumoService.findTipoInsumo(codInsumo).subscribe(
      (data: TipoInsumo | null) => {
        this.tipoInsumo = data ?? { codTipoInsumo: 0, descripcion: '' };
      },
      (error) => {
        console.error(`Error al buscar tipo de insumo del insumo con ID ${codInsumo}:`, error);
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

  toggleUpdatePopup(insumo: Insumo) {
    this.selected = insumo
    this.displayUpdatePopup = true
  }

  toggleSelectPopup(insumo: Insumo) {
    this.selected = insumo
    this.findTipoInsumo(insumo.codInsumo!)
    this.displaySelectPopup = true
  }

  toggleDeletePopup(insumo: Insumo) {
    if (!insumo.codInsumo) return

    this.deleteInsumo(insumo.codInsumo)
  }

  // confirmaciones

  onConfirmCreate(insumo: Insumo) {
    this.createInsumo(insumo)
    this.displayCreatePopup = false
  }

  onConfirmUpdate(insumo: Insumo) {
    if (!this.selected.codInsumo) return

    this.updateInsumo(this.selected.codInsumo, insumo)
    this.displayUpdatePopup = false
  }
}
