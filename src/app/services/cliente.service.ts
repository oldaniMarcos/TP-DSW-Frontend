import { Injectable } from '@angular/core';
import { ApiService } from './api.service.js';
import { environment } from '../../environment.js';
import { Observable } from 'rxjs';
import { Cliente } from '../../types.js';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private URL = `${environment.URL}/cliente`

  constructor(
    private apiService: ApiService
  ) { }

  findAll(): Observable<Cliente[]> {
    return this.apiService.get<Cliente[]>(this.URL, {})
  }

  findOne(id: number): Observable<Cliente> {
    return this.apiService.get<Cliente>(`${this.URL}/${id}`, {})
  }

  post(cliente: Cliente): Observable<Cliente> {
    return this.apiService.post<Cliente, Cliente>(this.URL, cliente, {})
  }

  put(id: number, cliente: Cliente): Observable<Cliente> {
    return this.apiService.put<Cliente, Cliente>(`${this.URL}/${id}`, cliente, {})
  }

  delete(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.URL}/${id}`, {})
  }
}
