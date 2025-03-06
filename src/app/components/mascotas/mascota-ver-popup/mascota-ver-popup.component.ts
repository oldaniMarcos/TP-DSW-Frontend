import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Animal } from '../../../../types';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-mascota-ver-popup',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './mascota-ver-popup.component.html',
  styleUrl: './mascota-ver-popup.component.scss'
})
export class MascotaVerPopupComponent {

  @Input() display: boolean = false

  @Input() animal: Animal = {
    nroHistClinica: 0,
    nombre: '',
    fechaNac: '',
    idCliente: 0,
    idRaza: 0,
  }

  @Output() displayChange = new EventEmitter<boolean>();

  edad: number | null = null;

  ngOnInit() {
    if (this.animal?.fechaNac) {
      this.calcularEdad(this.animal.fechaNac);
    }
  }

  calcularEdad(fechaNac: string) {
    const fechaNacimiento = new Date(fechaNac);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }

    this.edad = edad;
    console.log(this.edad)
  }

  onClose() {
    this.display = false
    this.displayChange.emit(this.display)
  }

}
