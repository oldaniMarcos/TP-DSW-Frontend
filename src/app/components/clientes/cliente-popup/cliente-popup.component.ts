import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { Cliente } from '../../../../types';

@Component({
  selector: 'app-cliente-popup',
  standalone: true,
  imports: [CommonModule, DialogModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cliente-popup.component.html',
  styleUrl: './cliente-popup.component.scss'
})
export class ClientePopupComponent {

  clienteForm: FormGroup

  constructor( private formBuilder: FormBuilder) {
    this.clienteForm = this.formBuilder.group({
      dni: ['', [Validators.required]],
      nombreYApellido: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      email: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  @Input() display: boolean = false
  @Input() title!: string 

  @Output() displayChange = new EventEmitter<boolean>()
  @Output() confirm = new EventEmitter<Cliente>()

  @Input() cliente: Cliente = {
    dni: '',
    nombreYApellido: '',
    telefono: '',
    direccion: '',
    email: '',
    usuario: '',
    password: '',
    rol: ''
  }

  onConfirm() {
    const { dni, nombreYApellido, telefono, direccion, email, usuario, password} = this.clienteForm.value

    this.confirm.emit({
      dni: dni || '',
      nombreYApellido: nombreYApellido || '',
      telefono: telefono || '',
      direccion: direccion || '',
      email: email || '',
      usuario: usuario || '',
      password: password || '',
      rol: 'cliente'
    })

    this.display = false
    this.displayChange.emit(this.display)
  }

  onCancel() {
    this.display = false
    this.displayChange.emit(this.display)
  }

  ngOnChanges() {
    this.clienteForm.patchValue(this.cliente)
  }


}
