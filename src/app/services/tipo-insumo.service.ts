import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { Observable } from 'rxjs';
import { TipoInsumo } from '../../types.js';
import { ApiService } from './api.service.js';

@Injectable({
  providedIn: 'root'
})
export class TipoInsumoService {

    private URL = `${environment.URL}/tipo-insumo`
  
    constructor(
      private apiService: ApiService
    ) { }
  
    findAll(): Observable<TipoInsumo[]> {
      return this.apiService.get<TipoInsumo[]>(this.URL, {})
    }
  
    findOne(codTipoInsumo: number): Observable<TipoInsumo> {
      return this.apiService.get<TipoInsumo>(`${this.URL}/${codTipoInsumo}`, {})
    }
  
    post(tipoInsumo: TipoInsumo): Observable<TipoInsumo> {
      return this.apiService.post<TipoInsumo, TipoInsumo>(this.URL, tipoInsumo, {})
    }
  
    patch(codTipoInsumo: number, tipoInsumo: TipoInsumo): Observable<TipoInsumo> {
      return this.apiService.patch<TipoInsumo, TipoInsumo>(`${this.URL}/${codTipoInsumo}`, tipoInsumo, {})
    }
  
    delete(codTipoInsumo: number): Observable<void> {
      return this.apiService.delete<void>(`${this.URL}/${codTipoInsumo}`, {})
    }
}
