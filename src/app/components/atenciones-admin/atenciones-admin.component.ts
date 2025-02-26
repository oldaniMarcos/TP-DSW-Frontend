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

@Component({
  selector: 'app-atenciones-admin',
  standalone: true,
  imports: [CommonModule, AtencionAdminCardComponent, AtencionAdminPopupComponent, ButtonModule, FormsModule, PrecioAtencionPopupComponent, AtencionAdminVerPopupComponent],
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

  precioAtencion: PrecioAtencion = {
    idPrecioAtencion: 0,
    fechaDesde: '',
    valor: 0
  }

  constructor(
    private atencionService: AtencionService,
    private precioAtencionService: PrecioAtencionService
  ) { }

  precioAtencionActual: PrecioAtencion | null = null;

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
      (error) => {
        console.error('Error al buscar atenciones:', error);
      }
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
      (error) => {
        console.error(`Error al buscar atencion con id ${idAtencion}:`, error)
      }
    )
  }

  createAtencion(atencion: Atencion): void {
  this.atencionService.post(atencion).subscribe(
    (newAtencion: Atencion) => {
      this.atenciones.push(newAtencion); 
    },
    (error) => {
      console.error('Error al crear una atencion:', error);
    }
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
      (error) => {
        console.error(`Error al actualizar atencion con id ${idAtencion}:`, error);
      }
    );
  }

  deleteAtencion(idAtencion: number): void {
    this.atencionService.delete(idAtencion).pipe(take(1)).subscribe(
      () => {
        this.atenciones = this.atenciones.filter(c => c.idAtencion !== idAtencion);
        this.filteredAtenciones = this.filteredAtenciones.filter(c => c.idAtencion !== idAtencion);
      },
      (error) => {
        console.error(`Error al eliminar atención con id ${idAtencion}:`, error);
      }
    );
  }

  findPrecioAtencionActual(): void {
    this.precioAtencionService.findAll().subscribe(
      (precios: PrecioAtencion[]) => {
        if (precios.length > 0) {
          this.precioAtencionActual = precios.reduce(
            (max, p) => (p.idPrecioAtencion !== undefined && max.idPrecioAtencion !== undefined && p.idPrecioAtencion > max.idPrecioAtencion) ? p : max, 
            precios[0]
          );
        }
      },
      (error) => {
        console.error('Error al obtener precio de atención:', error);
      }
    );
  }

  actualizarPrecioAtencion(precioAtencion: PrecioAtencion): void {
    this.precioAtencionService.post(precioAtencion).subscribe(
      (newPrecioAtencion: PrecioAtencion) => {
        this.precioAtencion = newPrecioAtencion;
        this.displayActualizarAtencionPopup = false;
      },
      (error) => {
        console.error('Error al actualizar el precio de la atención:', error);
      }
    );
  }

  displaySelectPopup: boolean = false
  displayUpdatePopup: boolean = false
  displayActualizarAtencionPopup: boolean = false

  //toggle popups

  toggleActualizarAtencionPopup() {
    this.displayActualizarAtencionPopup = true
  }

  toggleSelectPopup(atencion: Atencion) {
    this.selected = atencion
    this.displaySelectPopup = true
    console.log('atencion:', atencion)
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
  }

  onConfirmActualizarPrecioAtencion(precioAtencion: PrecioAtencion): void {
    this.precioAtencionService.post(precioAtencion).subscribe(
      (newPrecioAtencion: PrecioAtencion) => {
        this.precioAtencionActual = newPrecioAtencion;
        this.displayActualizarAtencionPopup = false;
      },
      (error) => {
        console.error('Error al actualizar el precio de atención:', error);
      }
    );
  }

}
