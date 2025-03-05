import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { ApiService } from './api.service.js';
import { Observable } from 'rxjs';
import { PrecioAtencion } from '../../types.js';

@Injectable({
  providedIn: 'root'
})
export class PrecioAtencionService {

  private URL = `${environment.URL}/precio-atencion`;

  constructor(
    private apiService: ApiService
  ) { }

  findAll(): Observable<PrecioAtencion[]> {
    return this.apiService.get<PrecioAtencion[]>(this.URL, {})
  }

  findOne(idPrecioAtencion: number): Observable<PrecioAtencion> {
    return this.apiService.get<PrecioAtencion>(`${this.URL}/${idPrecioAtencion}`, {})
  }

  post(precioAtencion: PrecioAtencion): Observable<PrecioAtencion> {
    return this.apiService.post<PrecioAtencion, PrecioAtencion>(this.URL, precioAtencion, {})
  }

  patch(idPrecioAtencion: number, precioAtencion: PrecioAtencion): Observable<PrecioAtencion> {
    return this.apiService.patch<PrecioAtencion, PrecioAtencion>(`${this.URL}/${idPrecioAtencion}`, precioAtencion, {})
  }

  delete(idPrecioAtencion: number): Observable<void> {
    return this.apiService.delete<void>(`${this.URL}/${idPrecioAtencion}`, {})
  }

  findMostRecent(): Observable<PrecioAtencion> {
    return this.apiService.get<PrecioAtencion>(`${this.URL}/list/recent`, {})
  }

}

