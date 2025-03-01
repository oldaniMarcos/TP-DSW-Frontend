import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service.js';
import { AtencionService } from '../../services/atencion.service.js';
import { Atencion } from '../../../types.js';
import { RegistrarAtencionComponent } from "../registrar-atencion/registrar-atencion.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink, RegistrarAtencionComponent, CommonModule, RegistrarAtencionComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  constructor(private router: Router
    , private localStorage: LocalStorageService
    , private atencionService: AtencionService
  ) {}

  displayCreatePopup: boolean = false


  logout() {
    this.localStorage.clear();
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
