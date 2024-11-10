import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Especie, Raza } from '../../types.js';
import { ApiService } from './api.service.js';
import { environment } from '../../environment.js';

@Injectable({
  providedIn: 'root'
})
export class EspecieService {

  private URL = `${environment.URL}/especie`;
  private razaURL = `${environment.URL}/raza`;

  constructor(
    private apiService: ApiService
  ) { }

  findAll(): Observable<Especie[]> {
    return this.apiService.get<Especie[]>(this.URL, {});
  }

  findOne(codEspecie: number): Observable<Especie> {
    return this.apiService.get<Especie>(`${this.URL}/${codEspecie}`, {});
  }

  post(especie: Especie): Observable<Especie> {
    return this.apiService.post<Especie, Especie>(this.URL, especie, {});
  }

  patch(codEspecie: number, especie: Especie): Observable<Especie> {
    return this.apiService.patch<Especie, Especie>(`${this.URL}/${codEspecie}`, especie, {});
  }

  delete(codEspecie: number): Observable<void> {
    return this.apiService.delete<void>(`${this.URL}/${codEspecie}`, {});
  }

  findRazasByEspecie(codEspecie: number): Observable<Raza[]> {
    return this.apiService.get<Raza[]>(`${this.razaURL}/${codEspecie}/raza`, {});
  }
  
}