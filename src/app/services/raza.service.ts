import { Injectable } from '@angular/core';
import { environment } from '../../environment.js';
import { ApiService } from './api.service.js';
import { Observable } from 'rxjs';
import { Raza } from '../../types.js';

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

  delete(codRaza: number): Observable<void> {
    return this.apiService.delete<void>(`${this.URL}/${codRaza}`, {});
  }

}
