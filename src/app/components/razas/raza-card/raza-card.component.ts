import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { Especie, Raza } from '../../../../types';
import { RazaService } from '../../../services/raza.service';

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

  @Input() breed!: Raza

  @Output() edit: EventEmitter<Raza> = new EventEmitter<Raza>()
  @Output() delete: EventEmitter<Raza> = new EventEmitter<Raza>()

  species: Especie = {
    codEspecie: 0,
    descripcion: '',
  }

  editRaza() {
    this.edit.emit(this.breed)
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
        this.species = data
      },
    )
  }

  deleteRaza() {
    this.delete.emit(this.breed)
  }

  ngOnInit() {
    this.findEspecie(this.breed.codRaza!)
  }

}
