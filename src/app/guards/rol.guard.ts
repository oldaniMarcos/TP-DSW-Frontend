import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class RolGuard implements CanActivate {
  constructor(private router: Router
    , private localStorage: LocalStorageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const expected = route.data['rol'] as string; 
    const rol = this.localStorage.getItem('rol');

    if (!rol) {
      this.router.navigate(['/login'])
      return false
    }

    if (rol === expected) {
      return true; 
    }

    this.router.navigate(['/not-authorized']); 
    return false; 
  }
}
