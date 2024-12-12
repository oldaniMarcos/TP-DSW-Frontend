import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component.js';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './services/local-storage.service.js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TP-DSW-Frontend';
  isVisible = true;

  constructor(private router: Router
    , private localStorage: LocalStorageService
  ) {}

  ngOnInit() {

    // if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    //   this.localStorage.clear();
    // }

    //esconder el header en la pagina de login
    this.router.events.subscribe(() => {
      
      const currentRoute = this.router.url;
      this.isVisible = currentRoute !== '/login';
    });
  }
}
