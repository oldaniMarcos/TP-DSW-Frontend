import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';
import { Animal } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private URL = `${environment.URL}/animal`

  constructor(
    private apiService: ApiService
  ) { }

  findAll(): Observable<Animal[]> {
    return this.apiService.get<Animal[]>(this.URL, {})
  }

  findOne(nroHistoriaClinica: number): Observable<Animal> {
    return this.apiService.get<Animal>(`${this.URL}/${nroHistoriaClinica}`, {})
  }

  post(animal: Animal): Observable<Animal> {
    return this.apiService.post<Animal, Animal>(this.URL, animal, {})
  }

  patch(nroHistoriaClinica: number, animal: Animal): Observable<Animal> {
    return this.apiService.patch<Animal, Animal>(`${this.URL}/${nroHistoriaClinica}`, animal, {})
  }

  delete(nroHistoriaClinica: number): Observable<void> {
    return this.apiService.delete<void>(`${this.URL}/${nroHistoriaClinica}`, {})
  }

  findByClienteId(clienteId: number): Observable<Animal[]> {
    return this.apiService.get<Animal[]>(`${this.URL}/cliente/${clienteId}`, {});
  }

  hasCliente(idCliente: number): Observable<boolean> {
      return this.apiService.get<{ exists: boolean }>(`${this.URL}/exists/cliente/${idCliente}`, {})
        .pipe(map(response => response.exists));
    }
}
