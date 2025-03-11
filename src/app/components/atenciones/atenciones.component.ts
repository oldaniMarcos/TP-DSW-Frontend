import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Animal, Atencion, PrecioAtencion } from '../../../types';
import { AtencionService } from '../../services/atencion.service';
import { ButtonModule } from 'primeng/button';
import { AtencionCardComponent } from './atencion-card/atencion-card.component';
import { firstValueFrom, take } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AtencionVerPopupComponent } from './atencion-ver-popup/atencion-ver-popup.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-atenciones-admin',
  standalone: true,
  imports: [CommonModule, AtencionCardComponent, ButtonModule, FormsModule, AtencionVerPopupComponent],
  templateUrl: './atenciones.component.html',
  styleUrls: ['./atenciones.component.scss'],
})
export class AtencionesComponent {

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
    private authService: AuthService
  ) { }

  precioAtencionActual: PrecioAtencion | null = null;

  ngOnInit() {
    this.findAtenciones();
  }

  selectedDate: string = '';

  async findAtenciones() {
    const res = await firstValueFrom(this.authService.fetchDetails());
    const id = res.id
    
    if (id) {
      this.atencionService.findByClienteId(+id).subscribe(
        (data: Atencion[]) => {
          this.atenciones = data;
          this.filteredAtenciones = [...this.atenciones];
        },
      );
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

  findAtencion(idAtencion: number): void {
    this.atencionService.findOne(idAtencion).subscribe(
      (data: Atencion) => {
        this.selected = data
      },
    )
  }

  displaySelectPopup: boolean = false

  //toggle popups

  toggleSelectPopup(atencion: Atencion) {
    this.selected = atencion
    this.displaySelectPopup = true
  }
}
