import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Atencion } from '../../../types';
import { AtencionService } from '../../services/atencion.service';
import { ButtonModule } from 'primeng/button';
import { AtencionAdminCardComponent } from './atencion-admin-card/atencion-admin-card.component';
import { AtencionAdminPopupComponent } from './atencion-admin-popup/atencion-admin-popup.component';
import { Subject, take } from 'rxjs';

@Component({
  selector: 'app-atenciones-admin',
  standalone: true,
  imports: [CommonModule, AtencionAdminCardComponent, AtencionAdminPopupComponent, ButtonModule],
  templateUrl: './atenciones-admin.component.html',
  styleUrls: ['./atenciones-admin.component.scss'],
})
export class AtencionesAdminComponent {

  //private destroy$ = new Subject<void>() //para manejar los unsuscribes, sino interfiere con el componente registrar-atencion

  atenciones: Atencion[] = []
  selected: Atencion = {
    idAtencion: 0,
    fechaHora: '',
    resultado: '',
    observaciones: '',
    idAnimal: 0,
    idPrecio: 0,
    idVeterinario: 0,
    idsInsumos: []
  }

  constructor(
    private atencionService: AtencionService
  ) { }

  ngOnInit() {
    this.findAtenciones()
  }

  findAtenciones(): void {
    this.atencionService.findAll().subscribe(
      (data: Atencion[]) => {
        this.atenciones = data
      },
      (error) => {
        console.error('Error al buscar atenciones:', error)
      }
    )
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
        if (index > -1) this.atenciones[index] = updatedAtencion;
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
      },
      (error) => {
        console.error(`Error al eliminar atencion con id ${idAtencion}:`, error);
      }
    );
  }

  displayCreatePopup: boolean = false
  displayUpdatePopup: boolean = false

  //toggle popups

  toggleCreatePopup() {
    this.displayCreatePopup = true
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

  onConfirmCreate(atencion: Atencion) {
    this.createAtencion(atencion)
    this.displayCreatePopup = false
  }

  onConfirmUpdate(atencion: Atencion) {
    if (!this.selected.idAtencion) return

    this.updateAtencion(this.selected.idAtencion, atencion)
    this.displayUpdatePopup = false
  }

  // ngOnDestroy(): void {
  //   this.destroy$.next();
  //   this.destroy$.complete();
  // }

}
