import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { ApiService } from './api.service.js';
import { Veterinario } from '../../types.js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {

  private URL = `${environment.URL}/veterinario`

  constructor(
    private apiService: ApiService
  ) { }

  findAll(): Observable<Veterinario[]> {
    return this.apiService.get<Veterinario[]>(this.URL, {})
  }

  findOne(idVeterinario: number): Observable<Veterinario> {
    return this.apiService.get<Veterinario>(`${this.URL}/${idVeterinario}`, {})
  }

  post(veterinario: Veterinario): Observable<Veterinario> {
    return this.apiService.post<Veterinario, Veterinario>(this.URL, veterinario, {})
  }

  patch(idVeterinario: number, veterinario: Veterinario): Observable<Veterinario> {
    return this.apiService.patch<Veterinario, Veterinario>(`${this.URL}/${idVeterinario}`, veterinario, {})
  }

  delete(idVeterinario: number): Observable<void> {
    return this.apiService.delete<void>(`${this.URL}/${idVeterinario}`, {})
  }

  check(dni: string, email: string, nroMatricula: string): Observable<{ dni: string; email: string; nroMatricula: string }> {
    return this.apiService.post<{ dni: string; email: string; nroMatricula: string }, { dni: string; email: string; nroMatricula: string }>(
      `${this.URL}/check`, 
      { dni, email, nroMatricula }, 
      {}
    )
  }
}