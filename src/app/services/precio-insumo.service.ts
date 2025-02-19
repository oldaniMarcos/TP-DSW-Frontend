import { Injectable } from '@angular/core';
import { environment } from '../../environment.js';
import { Observable } from 'rxjs';
import { ApiService } from './api.service.js';
import { PrecioInsumo } from '../../types.js';

@Injectable({
  providedIn: 'root'
})
export class PrecioInsumoService {

  private URL = `${environment.URL}/precio-insumo`;

  constructor(
    private apiService: ApiService
  ) { }

  findAll(): Observable<PrecioInsumo[]> {
    return this.apiService.get<PrecioInsumo[]>(this.URL, {})
  }

  findOne(codPrecioInsumo: number): Observable<PrecioInsumo> {
    return this.apiService.get<PrecioInsumo>(`${this.URL}/${codPrecioInsumo}`, {})
  }

  post(precioInsumo: PrecioInsumo): Observable<PrecioInsumo> {
    return this.apiService.post<PrecioInsumo, PrecioInsumo>(this.URL, precioInsumo, {})
  }

  patch(codPrecioInsumo: number, precioInsumo: PrecioInsumo): Observable<PrecioInsumo> {
    return this.apiService.patch<PrecioInsumo, PrecioInsumo>(`${this.URL}/${codPrecioInsumo}`, precioInsumo, {})
  }

  delete(codPrecioInsumo: number): Observable<void> {
    return this.apiService.delete<void>(`${this.URL}/${codPrecioInsumo}`, {})
  }

  findMostRecentByInsumo(idInsumo: number): Observable<PrecioInsumo> {
    return this.apiService.get<PrecioInsumo>(`${this.URL}/recent/${idInsumo}`, {})
  }
}
