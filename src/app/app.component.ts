import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component.js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TP-DSW-Frontend';
  isVisible = true;

  constructor(private router: Router) {}

  ngOnInit() {

    //esconder el header en la pagina de login
    this.router.events.subscribe(() => {
      
      const currentRoute = this.router.url;
      this.isVisible = currentRoute !== '/login';
    });
  }
}
