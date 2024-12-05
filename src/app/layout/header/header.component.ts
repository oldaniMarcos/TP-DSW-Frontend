import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import {Location, NgStyle} from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgStyle, SidebarModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private router: Router, private location: Location) {}

  isHomeRoute = false
  isAdminRoute = false
  isProfileRoute = false
  is404Route = false
  isNotAuthorizedRoute = false
  sidebarVisible = false

  goBack() {
    this.location.back()
  }

  //cambia el estilo del header en las rutas home y admin para mantener consistencia
  changeStyle() {
    if(!this.isHomeRoute || !this.isAdminRoute) return {
      'justify-content': 'right',
    }; else return
  }

  ngOnInit() {
    this.router.events.subscribe(() => {
      
      const currentRoute = this.router.url;
      this.isHomeRoute = currentRoute !== '/home';
      this.isAdminRoute = currentRoute !== '/admin';
      this.isProfileRoute = currentRoute !== '/profile';
      this.is404Route = currentRoute !== '/page-not-found';
      this.isNotAuthorizedRoute = currentRoute !== '/not-authorized';
    });
  }
}

//lo relacionado con el profile no esta en uso