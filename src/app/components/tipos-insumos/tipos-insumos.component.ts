import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TipoInsumoCardComponent } from './tipo-insumo-card/tipo-insumo-card.component';
import { TipoInsumoPopupComponent } from './tipo-insumo-popup/tipo-insumo-popup.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { TipoInsumo } from '../../../types';
import { TipoInsumoService } from '../../services/tipo-insumo.service';
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

  supplyTypes: TipoInsumo[] = []
  selected: TipoInsumo = {
    codTipoInsumo: 0,
    descripcion: '',
  }

  supplyTypeFilter: string = '';

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
        if (this.supplyTypeFilter) {
          const filtroLowerCase = this.supplyTypeFilter.toLowerCase();
          this.supplyTypes = data.filter(tipoInsumo =>
            tipoInsumo.descripcion.toLowerCase().includes(filtroLowerCase)
          );
        } else {
          this.supplyTypes = data;
        }
      },
    );
  }

  findTipoInsumo(codTipoInsumo: number): void {
    this.tipoInsumoService.findOne(codTipoInsumo).subscribe(
      (data: TipoInsumo) => {
        this.selected = data
      },
    )
  }

  createTipoInsumo(tipoInsumo: TipoInsumo): void {
  this.tipoInsumoService.post(tipoInsumo).subscribe(
    (newInsumo: TipoInsumo) => {
      this.supplyTypes.push(newInsumo); 
    },
  );
  }

  updateTipoInsumo(codTipoInsumo: number, tipoInsumo: TipoInsumo): void {

    this.tipoInsumoService.patch(codTipoInsumo, tipoInsumo).subscribe(
      (updatedInsumo: TipoInsumo) => {
        const index = this.supplyTypes.findIndex(c => c.codTipoInsumo === codTipoInsumo);
        if (index > -1) this.supplyTypes[index] = updatedInsumo;
      },
    );
  }

  deleteTipoInsumo(codTipoInsumo: number): void {
    this.tipoInsumoService.delete(codTipoInsumo).subscribe(
      () => {
        this.supplyTypes = this.supplyTypes.filter(c => c.codTipoInsumo !== codTipoInsumo);
      },
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
