import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Location, NgStyle} from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { LocalStorageService } from '../../services/local-storage.service';
import { TruncateNamePipe } from '../../pipes/truncate-name.pipe';
import { AuthService } from '../../services/auth.service';

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
    , private authService: AuthService
  ) {}

  isHomeRoute = true
  isAdminRoute = true
  is404Route = false
  isNotAuthorizedRoute = false
  sidebarVisible = false
  nombreYApellido: any = ''
  dni: any = ''
  email: any = ''
  rol: any = ''

  goBack() {
    this.location.back()
  }

  isAdmin() {

    return this.rol === 'admin';
    
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

    const token = this.localStorage.getItem('token')

    if (token) {

      this.authService.fetchDetails().subscribe((res) => {

        this.rol = res.rol
        this.nombreYApellido = res.nombreYApellido
        this.dni = res.dni
        this.email = res.email
        
      })
    }
  }
}