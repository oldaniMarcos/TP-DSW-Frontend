import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { VeterinarioCardComponent } from './veterinario-card/veterinario-card.component';
import { Veterinario } from '../../../types';
import { VeterinarioService } from '../../services/veterinario.service';
import { VeterinarioPopupComponent } from './veterinario-popup/veterinario-popup.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { VeterinarioVerPopupComponent } from './veterinario-ver-popup/veterinario-ver-popup.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-veterinarios',
  standalone: true,
  imports: [CommonModule, VeterinarioCardComponent, VeterinarioPopupComponent, VeterinarioVerPopupComponent, ButtonModule, FormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './veterinarios.component.html',
  styleUrl: './veterinarios.component.scss'
})
export class VeterinariosComponent {

  veterinarios: Veterinario[] = []
  selected: Veterinario = {
    idVeterinario: 0,
    nroMatricula: '',
    dni: '',
    nombreYApellido: '',
    direccion: '',
    telefono: '',
    email: '',
  }

  matFilter: string = ''

  constructor(
    private veterinarioService: VeterinarioService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.findVeterinarios()
  }

  findVeterinarios(): void {
    this.veterinarioService.findAll().subscribe(
      (data: Veterinario[]) => {
        if (this.matFilter) {
          this.veterinarios = data.filter(veterinario => veterinario.nroMatricula.includes(this.matFilter))
        } else {
          this.veterinarios = data
        }
      },
    )
  }

  findVeterinario(idVeterinario: number): void {
    this.veterinarioService.findOne(idVeterinario).subscribe(
      (data: Veterinario) => {
        this.selected = data
      },
    )
  }

  createVeterinario(veterinario: Veterinario): void {
  this.veterinarioService.post(veterinario).subscribe(
    (newVeterinario: Veterinario) => {
      this.veterinarios.push(newVeterinario); 
    },
  );
  }

  updateVeterinario(idVeterinario: number, veterinario: Veterinario): void {
    this.veterinarioService.patch(idVeterinario, veterinario).subscribe(
      (updatedVeterinario: Veterinario) => {
        const index = this.veterinarios.findIndex(c => c.idVeterinario === idVeterinario);
        if (index > -1) this.veterinarios[index] = updatedVeterinario;
      },
    );
  }

  deleteVeterinario(idVeterinario: number): void {
    this.veterinarioService.delete(idVeterinario).subscribe(
      () => {
        this.veterinarios = this.veterinarios.filter(c => c.idVeterinario !== idVeterinario);
      },
    );
  }

  displayCreatePopup: boolean = false
  displayUpdatePopup: boolean = false
  displaySelectPopup: boolean = false


  //toggle popups

  toggleCreatePopup() {
    this.displayCreatePopup = true
  }

  toggleUpdatePopup(veterinario: Veterinario) {
    this.selected = veterinario
    this.displayUpdatePopup = true
  }

  toggleSelectPopup(veterinario: Veterinario) {
    this.selected = veterinario
    this.displaySelectPopup = true
  }

  toggleDeletePopup(veterinario: Veterinario) {
    if (!veterinario.idVeterinario) return

    this.deleteVeterinario(veterinario.idVeterinario)
  }

  // confirmaciones

  onConfirmCreate(veterinario: Veterinario) {
    this.createVeterinario(veterinario)
    this.displayCreatePopup = false
    this.messageService.add({severity:'success', detail:'Veterinario creado correctamente.', life: 2000});
  }

  onConfirmUpdate(veterinario: Veterinario) {
    if (!this.selected.idVeterinario) return

    this.updateVeterinario(this.selected.idVeterinario, veterinario)
    this.displayUpdatePopup = false

    this.messageService.add({severity:'success', detail:'Veterinario editado correctamente.', life: 2000});
  }
}
