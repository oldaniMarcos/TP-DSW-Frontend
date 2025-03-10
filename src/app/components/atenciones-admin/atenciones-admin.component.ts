import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Animal, Atencion, PrecioAtencion } from '../../../types';
import { AtencionService } from '../../services/atencion.service';
import { PrecioAtencionService } from '../../services/precio-atencion.service';
import { ButtonModule } from 'primeng/button';
import { AtencionAdminCardComponent } from './atencion-admin-card/atencion-admin-card.component';
import { AtencionAdminPopupComponent } from './atencion-admin-popup/atencion-admin-popup.component';
import { take } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { PrecioAtencionPopupComponent } from './precio-atencion-popup/precio-atencion-popup.component';
import { AtencionAdminVerPopupComponent } from './atencion-admin-ver-popup/atencion-admin-ver-popup.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-atenciones-admin',
  standalone: true,
  imports: [CommonModule, AtencionAdminCardComponent, AtencionAdminPopupComponent, ButtonModule, FormsModule, PrecioAtencionPopupComponent, AtencionAdminVerPopupComponent, ToastModule],
  providers: [MessageService],
  templateUrl: './atenciones-admin.component.html',
  styleUrls: ['./atenciones-admin.component.scss'],
})
export class AtencionesAdminComponent {

  atenciones: (Atencion & { animal?: Animal, precioAtencion?: PrecioAtencion })[] = [];
  selected: Atencion = {
    idAtencion: 0,
    fechaHora: '',
    resultado: '',
    observaciones: '',
    valor: 0,
    idAnimal: 0,
    idPrecio: 0,
    idVeterinario: 0,
    idsInsumos: []
  }

  filteredAtenciones: (Atencion & { animal?: Animal, precioAtencion?: PrecioAtencion })[] = [];

  consultationPrice: PrecioAtencion = {
    idPrecioAtencion: 0,
    fechaDesde: '',
    valor: 0
  }

  constructor(
    private atencionService: AtencionService,
    private precioAtencionService: PrecioAtencionService,
    private messageService: MessageService
  ) { }

  currentConsultationPrice: PrecioAtencion | null = null;

  ngOnInit() {
    this.findAtenciones();
    this.findPrecioAtencionActual();
  }

  selectedDate: string = '';

  findAtenciones(): void {
    this.atencionService.findAll().subscribe(
      (data: Atencion[]) => {
        this.atenciones = data;
        this.filteredAtenciones = [...this.atenciones];
      },
    );
  }
  

  filterAtencionesByDate(): void {
    if (this.selectedDate) {
      this.filteredAtenciones = this.atenciones.filter((atencion) => {
        const atencionFecha = new Date(atencion.fechaHora).toLocaleDateString('en-CA');
        return atencionFecha === this.selectedDate;
      });
    } else {
      this.filteredAtenciones = [...this.atenciones];
    }
  }

  findAtencion(idAtencion: number): void {
    this.atencionService.findOne(idAtencion).subscribe(
      (data: Atencion) => {
        this.selected = data
      },
    )
  }

  createAtencion(atencion: Atencion): void {
  this.atencionService.post(atencion).subscribe(
    (newAtencion: Atencion) => {
      this.atenciones.push(newAtencion); 
    },
  );
  }

  updateAtencion(idAtencion: number, atencion: Atencion): void {
    this.atencionService.patch(idAtencion, atencion).subscribe(
      (updatedAtencion: Atencion) => {
        const index = this.atenciones.findIndex(c => c.idAtencion === idAtencion);
        if (index > -1) {
          this.atenciones = [
            ...this.atenciones.slice(0, index),
            updatedAtencion,
            ...this.atenciones.slice(index + 1)
          ]
        }
        this.filterAtencionesByDate();
      },
    );
  }

  deleteAtencion(idAtencion: number): void {
    this.atencionService.delete(idAtencion).pipe(take(1)).subscribe(
      () => {
        this.atenciones = this.atenciones.filter(c => c.idAtencion !== idAtencion);
        this.filteredAtenciones = this.filteredAtenciones.filter(c => c.idAtencion !== idAtencion);
      },
    );
  }

  findPrecioAtencionActual(): void {
    this.precioAtencionService.findAll().subscribe(
      (precios: PrecioAtencion[]) => {
        if (precios.length > 0) {
          this.currentConsultationPrice = precios.reduce(
            (max, p) => (p.idPrecioAtencion !== undefined && max.idPrecioAtencion !== undefined && p.idPrecioAtencion > max.idPrecioAtencion) ? p : max, 
            precios[0]
          );
        }
      },
    );
  }

  updatePrecioAtencion(consultationPrice: PrecioAtencion): void {
    this.precioAtencionService.post(consultationPrice).subscribe(
      (newConsultationPrice: PrecioAtencion) => {
        this.consultationPrice = newConsultationPrice;
        this.displayUpdateAtencionPopup = false;
      },
    );
  }

  displaySelectPopup: boolean = false
  displayUpdatePopup: boolean = false
  displayUpdateAtencionPopup: boolean = false

  //toggle popups

  toggleUpdateAtencionPopup() {
    this.displayUpdateAtencionPopup = true
  }

  toggleSelectPopup(atencion: Atencion) {
    this.selected = atencion
    this.displaySelectPopup = true
  }

  toggleUpdatePopup(atencion: Atencion) {
    this.selected = atencion
    this.displayUpdatePopup = true
  }

  toggleDeletePopup(atencion: Atencion) {
    if (!atencion.idAtencion) return

    this.deleteAtencion(atencion.idAtencion)
  }

  // confirmaciones

  onConfirmUpdate(atencion: Atencion) {
    if (!this.selected.idAtencion) return

    this.updateAtencion(this.selected.idAtencion, atencion)
    this.displayUpdatePopup = false
    this.messageService.add({severity: 'success', detail: 'Atencion editada correctamente.', life: 2000});
  }

  onConfirmUpdatePrecioAtencion(consultationPrice: PrecioAtencion): void {
    this.precioAtencionService.post(consultationPrice).subscribe(
      (newConsultationPrice: PrecioAtencion) => {
        this.currentConsultationPrice = newConsultationPrice;
        this.displayUpdateAtencionPopup = false;
        this.messageService.add({severity: 'success', detail: 'Precio de atencion actualizado correctamente.', life: 2000});
      },
    );
  }

}
