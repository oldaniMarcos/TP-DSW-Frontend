import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service.js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
  constructor(private router: Router
    , private localStorage: LocalStorageService
  ) {}

  logout() {
    this.localStorage.clear()
    this.router.navigate(['/login']);
  }

}
