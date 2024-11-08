import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AtencionAdminCardComponent } from './atencion-admin-card/atencion-admin-card.component.js';
import { Atencion } from '../../../types.js';
import { AtencionService } from '../../services/atencion.service.js';

@Component({
  selector: 'app-atenciones-admin',
  standalone: true,
  imports: [CommonModule, AtencionAdminCardComponent],
  templateUrl: './atenciones-admin.component.html',
  styleUrl: './atenciones-admin.component.scss'
})
export class AtencionesAdminComponent {

  atenciones: Atencion[] = []
  selected: Atencion | null = null

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
        console.error(`Error al buscar atencion con ID ${idAtencion}:`, error)
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
        console.error(`Error al actualizar atencion con ID ${idAtencion}:`, error);
      }
    );
  }

  deleteAtencion(idAtencion: number): void {
    this.atencionService.delete(idAtencion).subscribe(
      () => {
        this.atenciones = this.atenciones.filter(c => c.idAtencion !== idAtencion);
      },
      (error) => {
        console.error(`Error al eliminar atencion con ID ${idAtencion}:`, error);
      }
    );
  }

  addPrice(): void {
  }  
}
