import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AtencionAdminCardComponent } from './atencion-admin-card/atencion-admin-card.component.js';

@Component({
  selector: 'app-atenciones-admin',
  standalone: true,
  imports: [CommonModule, AtencionAdminCardComponent],
  templateUrl: './atenciones-admin.component.html',
  styleUrl: './atenciones-admin.component.scss'
})
export class AtencionesAdminComponent {

  atenciones = [
    {
      idAtencion: 1,
      fechaHora: "01-01-2024",
      resultado: "OK",  //estos dos atributos tienen el mismo significado, cambiar o borrar uno
      observaciones: "OK",

      nombreYApellido: "Juan Perez",
    },
    {
      idAtencion: 2,
      fechaHora: "02-01-2024",
      resultado: "OK",
      observaciones: "OK",

      nombreYApellido: "Juana Perez",
    },
    {
      idAtencion: 3,
      fechaHora: "03-01-2024",
      resultado: "OK",
      observaciones: "OK",

      nombreYApellido: "Juanita Perez",
    }
  ]

  addPrice(): void {
  }  
}
