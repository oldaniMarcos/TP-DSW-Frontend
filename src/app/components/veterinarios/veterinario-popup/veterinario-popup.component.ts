import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { Veterinario } from '../../../../types';
import { VeterinarioService } from '../../../services/veterinario.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-veterinario-popup',
  standalone: true,
  imports: [CommonModule, DialogModule, FormsModule, ReactiveFormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './veterinario-popup.component.html'
})
export class VeterinarioPopupComponent {

  veterinarioForm: FormGroup

  constructor( private formBuilder: FormBuilder, 
    private veterinarioService: VeterinarioService,
    private messageService: MessageService  
  ) {
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

    const checkDni = dni !== this.veterinario.dni;
    const checkNroMatricula = nroMatricula !== this.veterinario.nroMatricula;
    const checkEmail = email !== this.veterinario.email; 

    this.veterinarioService.check(
      checkDni ? dni : '', 
      checkEmail ? email : '', 
      checkNroMatricula ? nroMatricula : ''
    ).subscribe(response => {

      if (response.dni) {
        this.messageService.add({ severity: 'error', detail: 'El DNI ya está registrado. Por favor, ingrese otro.', life: 2000 });
        return;
      }

      if (response.nroMatricula) {
        this.messageService.add({ severity: 'error', detail: 'La matricula ya está en uso. Por favor, elija otro.', life: 2000 });
        return;
      }

      if (response.email) {
        this.messageService.add({ severity: 'error', detail: 'El correo electrónico ya está en uso. Por favor, ingrese otro.', life: 2000 });
        return;
      }

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
    })
    
    
  }

  onCancel() {
    this.display = false
    this.displayChange.emit(this.display)
  }

  ngOnChanges() {
    this.veterinarioForm.patchValue(this.veterinario)
  }
}
