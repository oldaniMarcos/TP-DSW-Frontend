import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, firstValueFrom, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RolGuard implements CanActivate {
  constructor(private router: Router
        , private authService: AuthService
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const expected = route.data['rol'] as string;

    const res = await firstValueFrom(this.authService.fetchDetails().pipe(
      catchError(() => of({ rol: null }))
    ));

    if (res.rol === expected) {
      return true;
    }

    this.router.navigate(['/not-authorized']);
    return false;
  }
}
