import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service.js';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  loginData = { usuario: '', password: ''}
  errorMessage: string = '';

  constructor(private clienteService: ClienteService, private router: Router) { }

  onSubmit() {
    this.clienteService.login(this.loginData.usuario, this.loginData.password).subscribe(
      (res) => {

        localStorage.setItem('rol', res.rol)

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
    const rol = localStorage.getItem('rol');
    if (rol === 'admin') {
      this.router.navigate(['/admin']);
    } else if (rol === 'cliente') {
      this.router.navigate(['/home']);
    } else return
  }
}
