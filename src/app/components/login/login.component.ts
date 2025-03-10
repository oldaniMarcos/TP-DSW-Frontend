import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Cliente } from '../../../types';
import { SignInPopupComponent } from './sign-in-popup/sign-in-popup.component';
import { AuthService } from '../../services/auth.service';

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
    , private authService: AuthService
  ) { }

  onSubmit() {

    this.authService.login(this.loginData.usuario, this.loginData.password).subscribe(
      (res) => {
        this.localStorage.setItem('token', res.token)
        this.localStorage.setItem('rol', res.user.rol)
        this.localStorage.setItem('id', res.user.id)
        this.localStorage.setItem('nombreYApellido', res.user.nombreYApellido)
        this.localStorage.setItem('dni', res.user.dni)
        this.localStorage.setItem('email', res.user.email)

        if (res.user.rol === 'admin') {
          this.router.navigate(['/admin'])
        }
        else {
          this.router.navigate(['/home'])
        }
      },
      () => {
        this.errorMessage = 'Credenciales Incorrectas'
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
