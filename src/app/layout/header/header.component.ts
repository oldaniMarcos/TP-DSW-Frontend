import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import {Location, NgStyle} from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { LocalStorageService } from '../../services/local-storage.service.js';
import { TruncateNamePipe } from '../../pipes/truncate-name.pipe.js';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgStyle, SidebarModule, ButtonModule, TruncateNamePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private router: Router
    , private location: Location
    , private localStorage: LocalStorageService
  ) {}

  isHomeRoute = true
  isAdminRoute = true
  is404Route = false
  isNotAuthorizedRoute = false
  sidebarVisible = false
  nombreYApellido: any = ''
  dni: any = ''
  email: any = ''

  goBack() {
    this.location.back()
  }

  isAdmin() {
    const rol = this.localStorage.getItem('rol')
    if (rol === 'admin') {
      return true
    } else return false
  }

  logout() {
    this.localStorage.clear()
    this.router.navigate(['/login']);
  }

  //cambia el estilo del header en las rutas home y admin para mantener consistencia
  changeStyle() {
    if(this.isHomeRoute || this.isAdminRoute) return {
      'justify-content': 'right',
    }; else return
  }

  ngOnInit() {

    this.router.events.subscribe(() => {
      
      const currentRoute = this.router.url;
      this.isHomeRoute = currentRoute === '/home';
      this.isAdminRoute = currentRoute === '/admin';
      this.is404Route = currentRoute === '/page-not-found';
      this.isNotAuthorizedRoute = currentRoute === '/not-authorized';

    });

    this.nombreYApellido = this.localStorage.getItem('nombreYApellido')
    this.dni = this.localStorage.getItem('dni')
    this.email = this.localStorage.getItem('email')

  }

}