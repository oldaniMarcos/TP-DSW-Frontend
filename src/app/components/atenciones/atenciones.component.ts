import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtencionCardComponent } from './atencion-card/atencion-card.component';
import { AtencionService } from '../../services/atencion.service';
import { Atencion } from '../../../types';
import { Animal } from '../../../types';
import { PrecioAtencion } from '../../../types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-atenciones',
  standalone: true,
  imports: [CommonModule, FormsModule, AtencionCardComponent],
  templateUrl: './atenciones.component.html',
  styleUrls: ['./atenciones.component.scss'],
})
export class AtencionesComponent implements OnInit {
  atenciones: (Atencion & { animal?: Animal, precioAtencion?: PrecioAtencion })[] = [];

  constructor(
    private atencionService: AtencionService,
  ) {}

  ngOnInit(): void {
    this.findAtenciones();
  }

  selectedDate: string = '';
  filteredAtenciones: (Atencion & { animal?: Animal, precioAtencion?: PrecioAtencion })[] = [];


  findAtenciones(): void {
    const id = localStorage.getItem('id');
    if (id) {
      this.atencionService.findByClienteId(+id).subscribe(
        (data: Atencion[]) => {
          this.atenciones = data;
          this.filteredAtenciones = [...this.atenciones];
        },
        (error) => {
          console.error('Error al buscar atenciones:', error);
        }
      );
    } else {
      console.error('No se encontró el ID del cliente en el localStorage.');
    }
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
}
