import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service.js';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  constructor(private router: Router
    , private localStorage: LocalStorageService
  ) {}

  logout() {
    this.localStorage.clear();
    this.router.navigate(['/login']);
  }

}
