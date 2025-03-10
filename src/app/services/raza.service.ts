import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';
import { Especie, Raza } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class RazaService {

  private URL = `${environment.URL}/raza`;

  constructor(
    private apiService: ApiService
  ) { }

  findAll(): Observable<Raza[]> {
    return this.apiService.get<Raza[]>(this.URL, {});
  }

  findOne(codRaza: number): Observable<Raza> {
    return this.apiService.get<Raza>(`${this.URL}/${codRaza}`, {});
  }

  post(raza: Raza): Observable<Raza> {
    return this.apiService.post<Raza, Raza>(this.URL, raza, {});
  }

  patch(codRaza: number, raza: Raza): Observable<Raza> {
    return this.apiService.patch<Raza, Raza>(`${this.URL}/${codRaza}`, raza, {});
  }

  findEspecie(codRaza: number): Observable<Especie> {
    return this.apiService.get<Especie>(`${this.URL}/${codRaza}/especie`, {});
  }

  delete(codRaza: number): Observable<void> {
    return this.apiService.delete<void>(`${this.URL}/${codRaza}`, {});
  }

  hasEspecie(codEspecie: number): Observable<boolean> {
      return this.apiService.get<{ exists: boolean }>(`${this.URL}/exists/especie/${codEspecie}`, {})
        .pipe(map(response => response.exists));
    }

}
