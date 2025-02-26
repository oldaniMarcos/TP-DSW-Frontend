import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service.js';
import { LocalStorageService } from '../../services/local-storage.service.js';
import { Cliente } from '../../../types.js';
import { SignInPopupComponent } from './sign-in-popup/sign-in-popup.component.js';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, SignInPopupComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  loginData = { usuario: '', password: ''}
  errorMessage: string = '';
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService
    , private router: Router
    , private localStorage: LocalStorageService
  ) { }

  onSubmit() {
    this.clienteService.login(this.loginData.usuario, this.loginData.password).subscribe(
      (res) => {

        this.localStorage.setItem('rol', res.rol)
        this.localStorage.setItem('id', res.id)
        this.localStorage.setItem('nombreYApellido', res.nombreYApellido)
        this.localStorage.setItem('dni', res.dni)
        this.localStorage.setItem('email', res.email)

        if (res.rol === 'admin') {
          this.router.navigate(['/admin'])
        }
        else {
          this.router.navigate(['/home'])
        }
      },
      () => {
        this.errorMessage = 'Credenciales incorrectas';
      }
    )
  }

  ngOnInit(): void {
    const rol = this.localStorage.getItem('rol');
    if (!rol) return
    if (rol === 'admin') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  createCliente(cliente: Cliente): void {
    this.clienteService.post(cliente).subscribe(
      (newCliente: Cliente) => {
        this.clientes.push(newCliente); 
      },
      (error) => {
        console.error('Error al crear un cliente:', error);
      }
    );      
    }

    displayCreatePopup: boolean = false

    toggleCreatePopup() {
      this.displayCreatePopup = true
    }
  
    onConfirmCreate(cliente: Cliente) {
        this.createCliente(cliente)
        this.displayCreatePopup = false
      }
}
