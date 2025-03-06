import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { Insumo, TipoInsumo } from '../../types';


@Injectable({
  providedIn: 'root'
})
export class InsumoService {

  private URL = `${environment.URL}/insumo`
  private tipoURL = `${environment.URL}/tipo-insumo`;

  constructor(
    private apiService: ApiService
  ) { }

  findAll(): Observable<Insumo[]> {
    return this.apiService.get<Insumo[]>(this.URL, {})
  }

  findOne(codInsumo: number): Observable<Insumo> {
    return this.apiService.get<Insumo>(`${this.URL}/${codInsumo}`, {})
  }

  post(insumo: Insumo): Observable<Insumo> {
    return this.apiService.post<Insumo, Insumo>(this.URL, insumo, {})
  }

  patch(codInsumo: number, insumo: Insumo): Observable<Insumo> {
    return this.apiService.patch<Insumo, Insumo>(`${this.URL}/${codInsumo}`, insumo, {})
  }

  delete(codInsumo: number): Observable<void> {
    return this.apiService.delete<void>(`${this.URL}/${codInsumo}`, {})
  }

  findAllTipos(): Observable<TipoInsumo[]> {
    return this.apiService.get<TipoInsumo[]>(this.tipoURL, {});
  }

  decreaseStock(codInsumo: number, cantidad: number): Observable<Insumo> {
    return this.apiService.patch<Insumo, { cantidad: number }>(
      `${this.URL}/${codInsumo}/decrease-stock`,
      { cantidad },
      {}
    );
  }

  findTipoInsumo(codInsumo: number): Observable<TipoInsumo> {
    return this.apiService.get<TipoInsumo>(`${this.URL}/${codInsumo}/tipo-insumo`, {});
  }

  hasTipoInsumo(codTipoInsumo: number): Observable<boolean> {
    return this.apiService.get<{ exists: boolean }>(`${this.URL}/exists/tipo-insumo/${codTipoInsumo}`, {})
      .pipe(map(response => response.exists));
  }
}
