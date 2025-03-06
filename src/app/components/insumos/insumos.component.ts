import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InsumoCardComponent } from './insumo-card/insumo-card.component';
import { Insumo, PrecioInsumo, TipoInsumo } from '../../../types';
import { InsumoService } from '../../services/insumo.service';
import { InsumoPopupComponent } from './insumo-popup/insumo-popup.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InsumoVerPopupComponent } from './insumo-ver-popup/insumo-ver-popup.component';
import { Observable } from 'rxjs';
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

  createInsumo(insumo: Insumo, valor: number, valorVenta: number): void {
    this.insumoService.post(insumo).subscribe(
    (newInsumo: Insumo) => {

      this.insumos.push(newInsumo);

      const newPrecio: PrecioInsumo = {
        fechaDesde: new Date().toISOString(),
        valor,
        valorVenta,
        idInsumo: newInsumo.codInsumo!,
      };

      this.precioInsumoService.post(newPrecio).subscribe();
    },
    (error) => console.error('Error al crear un insumo:', error)
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
        this.selectedPrecio = null
        this.displayPricePopup = true
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
      (error) => {
        console.error(`Error al buscar precio del insumo con ID ${insumo.codInsumo}:`, error)
      }
    )
  }

  // confirmaciones

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
