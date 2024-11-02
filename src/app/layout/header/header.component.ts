import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import {Location, NgStyle} from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, RouterLink, NgStyle],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private router: Router, private location: Location) {}

  isHomeRoute = false
  isAdminRoute = false

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
    //esconder el boton de retorno en rutas home y admin
    this.router.events.subscribe(() => {
      
      const currentRoute = this.router.url;
      this.isHomeRoute = currentRoute !== '/home';
      this.isAdminRoute = currentRoute !== '/admin';
    });
  }
}
