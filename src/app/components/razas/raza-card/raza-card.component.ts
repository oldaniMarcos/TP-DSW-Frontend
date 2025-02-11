import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { Especie, Raza } from '../../../../types.js';
import { RazaService } from '../../../services/raza.service.js';

@Component({
  selector: 'app-raza-card',
  standalone: true,
  imports: [FormsModule, ConfirmPopupModule, ToastModule],
  templateUrl: './raza-card.component.html',
  styleUrl: './raza-card.component.scss'
})
export class RazaCardComponent {

  constructor(private confirmationService: ConfirmationService
    , private razaService: RazaService) { }

  @ViewChild('deleteButton') deleteButton: any

  @Input() raza!: Raza

  @Output() edit: EventEmitter<Raza> = new EventEmitter<Raza>()
  @Output() delete: EventEmitter<Raza> = new EventEmitter<Raza>()

  especie: Especie = {
    codEspecie: 0,
    descripcion: '',
  }

  editRaza() {
    this.edit.emit(this.raza)
  }

  confirmDelete() {
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement,
      message: '¿Eliminar esta raza?',
      accept: () => {
        this.deleteRaza()
      },
    })
  }

  findEspecie(codRaza: number): void {
    this.razaService.findEspecie(codRaza).subscribe(
      (data: Especie) => {
        this.especie = data
      },
      (error) => {
        console.error(`Error al buscar especie de la raza con ID ${codRaza}:`, error)
      }
    )
  }

  deleteRaza() {
    this.delete.emit(this.raza)
  }

  ngOnInit() {
    this.findEspecie(this.raza.codRaza!)
  }

}
