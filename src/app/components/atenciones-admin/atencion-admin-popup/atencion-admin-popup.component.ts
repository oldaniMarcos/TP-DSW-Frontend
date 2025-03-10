import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { Atencion } from '../../../../types';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-atencion-admin-popup',
  standalone: true,
  imports: [CommonModule, DialogModule, FormsModule, ReactiveFormsModule, CalendarModule],
  templateUrl: './atencion-admin-popup.component.html',
  styleUrl: './atencion-admin-popup.component.scss'
})
export class AtencionAdminPopupComponent {

  atencionForm: FormGroup;

  constructor( private formBuilder: FormBuilder) {
    this.atencionForm = this.formBuilder.group({
      fechaHora: [new Date(), [Validators.required]],
      resultado: ['', [Validators.required]],
      observaciones: ['', [Validators.required]],
    });
  }

  @Input() display: boolean = false
  @Input() title!: string

  @Output() displayChange = new EventEmitter<boolean>()
  @Output() confirm = new EventEmitter<Atencion>()

  @Input() atencion: Atencion = {
    fechaHora: '',
    resultado: '',
    observaciones: '',
    valor: 0,
    idAnimal: 0,
    idPrecio: 0,
    idVeterinario: 0,
    idsInsumos: []
  }

  onConfirm() {
    const formValues = this.atencionForm.value

    const updatedAtencion = { 
      ...this.atencion, 
      ...formValues 
    }

    delete updatedAtencion.idAtencion
    delete updatedAtencion.animal
    delete updatedAtencion.precioAtencion
    delete updatedAtencion.veterinario
    delete updatedAtencion.insumos

    this.confirm.emit(updatedAtencion)

    this.display = false
    this.displayChange.emit(this.display)
  }

  onCancel() {
    this.display = false
    this.displayChange.emit(this.display)
  }

  ngOnChanges() {
    this.atencionForm.patchValue(this.atencion)   
  }

}
