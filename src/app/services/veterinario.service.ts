import { Injectable } from '@angular/core';
import { environment } from '../../environment.js';
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

  put(idVeterinario: number, veterinario: Veterinario): Observable<Veterinario> {
    return this.apiService.put<Veterinario, Veterinario>(`${this.URL}/${idVeterinario}`, veterinario, {})
  }

  delete(idVeterinario: number): Observable<void> {
    return this.apiService.delete<void>(`${this.URL}/${idVeterinario}`, {})
  }
}