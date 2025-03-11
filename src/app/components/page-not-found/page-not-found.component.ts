import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
})
export class PageNotFoundComponent {

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
