import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { ApiService } from './api.service.js';
import { map, Observable } from 'rxjs';
import { Atencion } from '../../types.js';

@Injectable({
  providedIn: 'root'
})
export class AtencionService {

  private URL = `${environment.URL}/atencion`

  constructor(
    private apiService: ApiService
  ) { }

  findAll(): Observable<Atencion[]> {
    return this.apiService.get<Atencion[]>(this.URL, {})
  }

  findOne(idAtencion: number): Observable<Atencion> {
    return this.apiService.get<Atencion>(`${this.URL}/${idAtencion}`, {})
  }

  post(atencion: Atencion): Observable<Atencion> {
    return this.apiService.post<Atencion, Atencion>(this.URL, atencion, {})
  }

  patch(idAtencion: number, atencion: Atencion): Observable<Atencion> {
    return this.apiService.patch<Atencion, Atencion>(`${this.URL}/${idAtencion}`, atencion, {})
  }

  delete(idAtencion: number): Observable<void> {
    return this.apiService.delete<void>(`${this.URL}/${idAtencion}`, {})
  }

  findByClienteId(clienteId: number): Observable<Atencion[]> {
    return this.apiService.get<Atencion[]>(`${this.URL}/cliente/${clienteId}`, {});
  }

  hasAnimal(idAnimal: number): Observable<boolean> {
    return this.apiService.get<{ exists: boolean }>(`${this.URL}/exists/animal/${idAnimal}`, {})
      .pipe(map(response => response.exists));
  }

  hasCliente(idCliente: number): Observable<boolean> {
    return this.apiService.get<{ exists: boolean }>(`${this.URL}/exists/animal/cliente/${idCliente}`, {})
      .pipe(map(response => response.exists));
  }

  hasVeterinario(idVeterinario: number): Observable<boolean> {
    return this.apiService.get<{ exists: boolean }>(`${this.URL}/exists/veterinario/${idVeterinario}`, {})
      .pipe(map(response => response.exists));
  }
}
