import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RolGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const expected = route.data['rol'] as string; 
    const rol = localStorage.getItem('rol'); 

    if (rol === expected) {
      return true; 
    }

    this.router.navigate(['/not-authorized']); 
    return false; 
  }
}
