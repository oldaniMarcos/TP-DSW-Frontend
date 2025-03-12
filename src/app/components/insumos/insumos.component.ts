import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InsumoCardComponent } from './insumo-card/insumo-card.component';
import { Insumo, PrecioInsumo, TipoInsumo } from '../../../types';
import { InsumoService } from '../../services/insumo.service';
import { InsumoPopupComponent } from './insumo-popup/insumo-popup.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InsumoVerPopupComponent } from './insumo-ver-popup/insumo-ver-popup.component';
import { RouterLink } from '@angular/router';
import { InsumoPrecioComponent } from './insumo-precio/insumo-precio.component';
import { PrecioInsumoService } from '../../services/precio-insumo.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-insumos',
  standalone: true,
  imports: [CommonModule, InsumoCardComponent, InsumoPopupComponent, InsumoVerPopupComponent, InsumoPrecioComponent, ButtonModule, FormsModule, RouterLink, ToastModule],
  providers: [MessageService],
  templateUrl: './insumos.component.html',
  styleUrl: './insumos.component.scss'
})
export class InsumosComponent {

  supplies: Insumo[] = []
  selected: Insumo = {
    codInsumo: 0,
    descripcion: '',
    stock: 0,
    fechaVencimiento: '',
    idTipoInsumo: 0,
  }

  supplyFilter: string = '';

  supplyType: TipoInsumo = {
    codTipoInsumo: 0,
    descripcion: '',
  }

  selectedPrecio: PrecioInsumo | null = {
    codPrecioInsumo: 0,
    fechaDesde: '',
    valor: 0,
    valorVenta: 0,
    idInsumo: 0,
  }

  constructor(
    private insumoService: InsumoService
    , private precioInsumoService: PrecioInsumoService
    , private messageService: MessageService
  ) { }

  ngOnInit() {
    this.findInsumos()
  }

  findInsumos(): void {
    this.insumoService.findAll().subscribe(
      (data: Insumo[]) => {
        if (this.supplyFilter) {
          const lowercaseFilter = this.supplyFilter.toLowerCase();
          this.supplies = data.filter(supply =>
            supply.descripcion.toLowerCase().includes(lowercaseFilter)
          );
        } else {
          this.supplies = data;
        }
      },
    );
  }

  findInsumo(codInsumo: number): void {
    this.insumoService.findOne(codInsumo).subscribe(
      (data: Insumo) => {
        this.selected = data
      },
    )
  }

  createInsumo(insumo: Insumo, valor: number, valorVenta: number): void {
    this.insumoService.post(insumo).subscribe(
    (newInsumo: Insumo) => {

      this.supplies.push(newInsumo);

      const price: PrecioInsumo = {
        fechaDesde: new Date().toISOString(),
        valor,
        valorVenta,
        idInsumo: newInsumo.codInsumo!,
      };

      this.precioInsumoService.post(price).subscribe();
    },
  );
  }

  updateInsumo(codInsumo: number, insumo: Insumo): void {

    this.insumoService.patch(codInsumo, insumo).subscribe(
      (supply: Insumo) => {
        const index = this.supplies.findIndex(c => c.codInsumo === codInsumo);
        if (index > -1) this.supplies[index] = supply;
      },
    );
  }

  deleteInsumo(codInsumo: number): void {
    this.insumoService.delete(codInsumo).subscribe(
      () => {
        this.supplies = this.supplies.filter(c => c.codInsumo !== codInsumo);
      },
    );
  }

  findTipoInsumo(codInsumo: number): void {
    this.insumoService.findTipoInsumo(codInsumo).subscribe(
      (data: TipoInsumo | null) => {
        this.supplyType = data ?? { codTipoInsumo: 0, descripcion: '' };
      },
    );
  }

  displayCreatePopup: boolean = false
  displayUpdatePopup: boolean = false
  displaySelectPopup: boolean = false
  displayPricePopup: boolean = false

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

  togglePricePopup(insumo: Insumo) {
    this.selected = insumo
    this.precioInsumoService.findMostRecentByInsumo(insumo.codInsumo!).subscribe(
      (precio) => {
        this.selectedPrecio = precio
        this.displayPricePopup = true
      },
    )
  }

  onConfirmCreate(event: { insumo: Insumo; valor: number; valorVenta: number }) {
    this.createInsumo(event.insumo, event.valor, event.valorVenta);

    this.messageService.add({severity: 'success', detail: 'Insumo creado correctamente.', life: 2000});
  }

  onConfirmUpdate(event: { insumo: Insumo; valor: number; valorVenta: number }) {
    if (!this.selected.codInsumo) return

    this.updateInsumo(this.selected.codInsumo, event.insumo)
    this.displayUpdatePopup = false

    this.messageService.add({severity: 'success', detail: 'Insumo editado correctamente.', life: 2000});
  }
}
