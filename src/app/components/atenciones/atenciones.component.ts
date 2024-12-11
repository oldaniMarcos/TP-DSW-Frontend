import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtencionCardComponent } from './atencion-card/atencion-card.component';
import { AtencionService } from '../../services/atencion.service';
import { Atencion } from '../../../types';
import { Animal } from '../../../types';
import { PrecioAtencion } from '../../../types';

@Component({
  selector: 'app-atenciones',
  standalone: true,
  imports: [CommonModule, AtencionCardComponent],
  templateUrl: './atenciones.component.html',
  styleUrls: ['./atenciones.component.scss'],
})
export class AtencionesComponent implements OnInit {
  atenciones: (Atencion & { animal?: Animal, precioAtencion?: PrecioAtencion })[] = [];

  constructor(
    private atencionService: AtencionService,
  ) {}

  ngOnInit(): void {
    this.fetchAtenciones();
  }

  fetchAtenciones(): void {
    const idCliente = localStorage.getItem('id');
    if (!idCliente) {
      console.error('No se encontró el ID del cliente logueado en localStorage.');
      return;
    }

    const idClienteNumber = parseInt(idCliente, 10);
    if (isNaN(idClienteNumber)) {
      console.error('El ID del cliente en localStorage no es un número válido.');
      return;
    }

    this.atencionService.findByClienteId(idClienteNumber).subscribe(
      (data: Atencion[]) => {
        this.atenciones = data;
        console.log(this.atenciones);
      }, 
    );
  }
}
