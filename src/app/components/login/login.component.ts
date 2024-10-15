import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    // Lógica para verificar las credenciales (esto sería mediante un servicio real)
    const role = this.authenticate(this.username, this.password);

    if (role === 'admin') {
      // Redirige al dashboard de administrador
      this.router.navigate(['/admin']);
    } else if (role === 'user') {
      // Redirige al dashboard de usuario
      this.router.navigate(['/home']);
    } else {
      // Si las credenciales son incorrectas
      this.errorMessage = 'Credenciales incorrectas';
    }
  }

  // Esta función simula la autenticación
  authenticate(username: string, password: string): string | null {
    // Lógica ficticia para asignar roles (simulación)
    if (username === 'admin' && password === 'admin123') {
      return 'admin';
    } else if (username === 'user' && password === 'user123') {
      return 'user';
    }
    return null;
  }
}
