import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-authorized',
  standalone: true,
  imports: [],
  templateUrl: './not-authorized.component.html',
  styleUrl: './not-authorized.component.scss'
})
export class NotAuthorizedComponent {

  constructor(private router: Router) {}

  return() {
    
    const rol = localStorage.getItem('rol')

    if (rol === 'admin') {
      this.router.navigate(['/admin']); 
    } else if (rol === 'cliente') {
      this.router.navigate(['/home']); 
    } else {
      this.router.navigate(['/login']); 
    }
  }

}
