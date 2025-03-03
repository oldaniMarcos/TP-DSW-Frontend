import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { Cliente } from '../../../../types';
import { ClienteService } from '../../../services/cliente.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-signin-popup',
  standalone: true,
  imports: [CommonModule, DialogModule, FormsModule, ReactiveFormsModule, ToastModule, TooltipModule],
  providers: [MessageService],
  templateUrl: './sign-in-popup.component.html',
  styleUrl: './sign-in-popup.component.scss'
})
export class SignInPopupComponent {

  clienteForm: FormGroup;

  constructor( private formBuilder: FormBuilder, private clienteService: ClienteService, private messageService: MessageService) {
    this.clienteForm = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.pattern(/^\d{7,}$/)]],
      nombreYApellido: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9,}$/)]],
      direccion: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)]],
    });
    
  }

  @Input() display: boolean = false

  @Output() displayChange = new EventEmitter<boolean>()
  @Output() confirm = new EventEmitter<Cliente>()

  @Input() cliente: Cliente = {
    id: 0,
    dni: '',
    nombreYApellido: '',
    telefono: '',
    direccion: '',
    email: '',
    usuario: '',
    password: '',
    rol: ''
  }

  title: string = 'Nuevo Cliente'

  onConfirm() {
    const { dni, nombreYApellido, telefono, direccion, email, usuario, password } = this.clienteForm.value;

    this.clienteService.check(dni, email, usuario).subscribe(response => {
      if (response.dni) {
        this.messageService.add({ severity: 'error', detail: 'El DNI ya está registrado. Por favor, ingrese otro.', life: 2000 });
        return;
      }

      if (response.usuario) {
        this.messageService.add({ severity: 'error', detail: 'El usuario ya está en uso. Por favor, elija otro.', life: 2000 });
        return;
      }

      if (response.email) {
        this.messageService.add({ severity: 'error', detail: 'El correo electrónico ya está en uso. Por favor, ingrese otro.', life: 2000 });
        return;
      }

      this.confirm.emit({
        dni,
        nombreYApellido,
        telefono,
        direccion,
        email,
        usuario,
        password,
        rol: 'cliente'
      });

      this.display = false;
      this.displayChange.emit(this.display);

      this.messageService.add({ severity: 'success', detail: 'Cliente registrado correctamente.', life: 2000 });
    });
  }

  onCancel() {
    this.display = false
    this.displayChange.emit(this.display)
  }

  ngOnChanges() {
    this.clienteForm.patchValue(this.cliente)
  }
  
}
