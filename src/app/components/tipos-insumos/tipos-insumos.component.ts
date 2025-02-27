import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TipoInsumoCardComponent } from './tipo-insumo-card/tipo-insumo-card.component.js';
import { TipoInsumoPopupComponent } from './tipo-insumo-popup/tipo-insumo-popup.component.js';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { TipoInsumo } from '../../../types.js';
import { TipoInsumoService } from '../../services/tipo-insumo.service.js';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tipos-tiposInsumos',
  standalone: true,
  imports: [CommonModule, TipoInsumoCardComponent, TipoInsumoPopupComponent, ButtonModule, FormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './tipos-insumos.component.html',
  styleUrl: './tipos-insumos.component.scss'
})
export class TiposInsumosComponent {

  tiposInsumos: TipoInsumo[] = []
  selected: TipoInsumo = {
    codTipoInsumo: 0,
    descripcion: '',
  }

  tipoInsumoFiltro: string = '';

  constructor(
    private tipoInsumoService: TipoInsumoService
    , private messageService: MessageService
  ) { }

  ngOnInit() {
    this.findTiposInsumos()
  }

  findTiposInsumos(): void {
    this.tipoInsumoService.findAll().subscribe(
      (data: TipoInsumo[]) => {
        if (this.tipoInsumoFiltro) {
          const filtroLowerCase = this.tipoInsumoFiltro.toLowerCase();
          this.tiposInsumos = data.filter(tipoInsumo =>
            tipoInsumo.descripcion.toLowerCase().includes(filtroLowerCase)
          );
        } else {
          this.tiposInsumos = data;
        }
      },
      (error) => {
        console.error('Error al buscar tipos de insumos:', error);
      }
    );
  }

  findTipoInsumo(codTipoInsumo: number): void {
    this.tipoInsumoService.findOne(codTipoInsumo).subscribe(
      (data: TipoInsumo) => {
        this.selected = data
      },
      (error) => {
        console.error(`Error al buscar tipo de insumo con código ${codTipoInsumo}:`, error)
      }
    )
  }

  createTipoInsumo(tipoInsumo: TipoInsumo): void {
  this.tipoInsumoService.post(tipoInsumo).subscribe(
    (newInsumo: TipoInsumo) => {
      this.tiposInsumos.push(newInsumo); 
    },
    (error) => {
      console.error('Error al crear un tipo de insumo:', error);
    }
  );
  }

  updateTipoInsumo(codTipoInsumo: number, tipoInsumo: TipoInsumo): void {

    this.tipoInsumoService.patch(codTipoInsumo, tipoInsumo).subscribe(
      (updatedInsumo: TipoInsumo) => {
        const index = this.tiposInsumos.findIndex(c => c.codTipoInsumo === codTipoInsumo);
        if (index > -1) this.tiposInsumos[index] = updatedInsumo;
      },
      (error) => {
        console.error(`Error al actualizar tipo de insumo con código ${codTipoInsumo}:`, error);
      }
    );
  }

  deleteTipoInsumo(codTipoInsumo: number): void {
    this.tipoInsumoService.delete(codTipoInsumo).subscribe(
      () => {
        this.tiposInsumos = this.tiposInsumos.filter(c => c.codTipoInsumo !== codTipoInsumo);
      },
      (error) => {
        console.error(`Error al eliminar insumo con código ${codTipoInsumo}:`, error);
      }
    );
  }

  displayCreatePopup: boolean = false
  displayUpdatePopup: boolean = false

  //toggle popups

  toggleCreatePopup() {
    this.displayCreatePopup = true
  }

  toggleUpdatePopup(tipoInsumo: TipoInsumo) {
    this.selected = tipoInsumo
    this.displayUpdatePopup = true
  }

  toggleDeletePopup(tipoInsumo: TipoInsumo) {
    if (!tipoInsumo.codTipoInsumo) return

    this.deleteTipoInsumo(tipoInsumo.codTipoInsumo)
  }

  // confirmaciones

  onConfirmCreate(tipoInsumo: TipoInsumo) {
    this.createTipoInsumo(tipoInsumo)
    this.displayCreatePopup = false

    this.messageService.add({severity: 'success', detail: 'Tipo de insumo creado correctamente.', life: 2000});
  }

  onConfirmUpdate(tipoInsumo: TipoInsumo) {
    if (!this.selected.codTipoInsumo) return

    this.updateTipoInsumo(this.selected.codTipoInsumo, tipoInsumo)
    this.displayUpdatePopup = false

    this.messageService.add({severity: 'success', detail: 'Tipo de insumo editado correctamente.', life: 2000});
  }
}
