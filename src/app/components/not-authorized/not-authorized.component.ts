import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-not-authorized',
  standalone: true,
  imports: [],
  templateUrl: './not-authorized.component.html',
  styleUrl: './not-authorized.component.scss'
})
export class NotAuthorizedComponent {

  constructor(private router: Router, private authService: AuthService) {}

  return() {
    
    this.authService.fetchDetails().subscribe((res) => {

      if (res.rol === 'admin') {
        this.router.navigate(['/admin'])
      } else if (res.rol === 'cliente') {
        this.router.navigate(['/home'])
      } else {
        this.router.navigate(['/login'])
      }
      
    })
  }

}
