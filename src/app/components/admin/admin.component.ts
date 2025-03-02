import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AtencionService } from '../../services/atencion.service.js';
import { Atencion } from '../../../types.js';
import { RegistrarAtencionComponent } from "../registrar-atencion/registrar-atencion.component";
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service.js';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink, RegistrarAtencionComponent, CommonModule, RegistrarAtencionComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  constructor(private router: Router
    , private atencionService: AtencionService
    , private authService: AuthService
  ) {}

  displayCreatePopup: boolean = false


  logout() {
    this.authService.logout()
    this.router.navigate(['/login']);
  }

  createAtencion(atencion: Atencion): void {
    this.atencionService.post(atencion).subscribe()
  }

  toggleCreatePopup() {
    this.displayCreatePopup = true
  }

  onConfirmCreate(atencion: Atencion) {
    this.createAtencion(atencion)
    this.displayCreatePopup = false
  }

}
