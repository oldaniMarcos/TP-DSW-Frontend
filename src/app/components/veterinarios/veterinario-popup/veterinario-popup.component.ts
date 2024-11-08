import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { Veterinario } from '../../../../types';

@Component({
  selector: 'app-veterinario-popup',
  standalone: true,
  imports: [CommonModule, DialogModule, FormsModule, ReactiveFormsModule],
  templateUrl: './veterinario-popup.component.html',
  styleUrl: './veterinario-popup.component.scss'
})
export class VeterinarioPopupComponent {

  veterinarioForm: FormGroup

  constructor( private formBuilder: FormBuilder) {
    this.veterinarioForm = this.formBuilder.group({
      nroMatricula: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      nombreYApellido: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      email: ['', [Validators.required]],
    })
  }

  @Input() display: boolean = false
  @Input() title!: string //! -> siempre se provee

  @Output() displayChange = new EventEmitter<boolean>()
  @Output() confirm = new EventEmitter<Veterinario>()

  @Input() veterinario: Veterinario = {
    nroMatricula: '',
    dni: '',
    nombreYApellido: '',
    telefono: '',
    direccion: '',
    email: '',
  }

  onConfirm() {
    const { nroMatricula, dni, nombreYApellido, telefono, direccion, email} = this.veterinarioForm.value

    this.confirm.emit({
      nroMatricula: nroMatricula || '',
      dni: dni || '',
      nombreYApellido: nombreYApellido || '',
      telefono: telefono || '',
      direccion: direccion || '',
      email: email || '',
    })

    this.display = false
    this.displayChange.emit(this.display)
  }

  onCancel() {
    this.display = false
    this.displayChange.emit(this.display)
  }

  ngOnChanges() {
    this.veterinarioForm.patchValue(this.veterinario)
  }
}
