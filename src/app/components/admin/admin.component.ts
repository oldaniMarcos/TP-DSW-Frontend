import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service.js';
import { AtencionService } from '../../services/atencion.service.js';
import { Atencion } from '../../../types.js';
import { RegistrarAtencionComponent } from "../registrar-atencion/registrar-atencion.component";
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

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

  // atenciones: Atencion[] = []
  displayCreatePopup: boolean = false


  logout() {
    this.localStorage.clear();
    this.router.navigate(['/login']);
  }

  createAtencion(atencion: Atencion): void {
    this.atencionService.post(atencion).subscribe()
    /*
    .subscribe(
      (newAtencion: Atencion) => {
        this.atenciones.push(newAtencion); 
      },
      (error) => {
        console.error('Error al crear una atencion:', error);
      }
    );
    */
  }

  toggleCreatePopup() {
    this.displayCreatePopup = true
  }

  onConfirmCreate(atencion: Atencion) {
    this.createAtencion(atencion)
    this.displayCreatePopup = false
  }

}
