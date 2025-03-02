import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = `${environment.URL}/auth`
  private token: string | null = null

  constructor( private apiService: ApiService) { }

  login(usuario: string, password: string) {
    return this.apiService.post<any, any>(`${this.URL}/login`, { usuario, password }, {}).pipe(
      tap(res => {
        this.token = res.token
        localStorage.setItem('token', this.token!)
      })
    )
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('token')
  }

  logout() {
    this.token = null;
    localStorage.clear()
  }

  isAuthenticated(): boolean {
    return !!this.getToken()
  }

}
