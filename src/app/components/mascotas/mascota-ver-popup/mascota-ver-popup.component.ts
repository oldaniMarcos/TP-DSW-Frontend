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

  age: number | null = null;

  ngOnInit() {
    if (this.animal?.fechaNac) {
      this.calculateAge(this.animal.fechaNac);
    }
  }

  calculateAge(birthDat: string) {
    const birthDate = new Date(birthDat);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const mes = today.getMonth() - birthDate.getMonth();

    if (mes < 0 || (mes === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    this.age = age;
  }

  onClose() {
    this.display = false
    this.displayChange.emit(this.display)
  }

}
