import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Cliente } from '../../types';
import { environment } from '../../environments/environment';

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

  patch(id: number, cliente: Cliente): Observable<Cliente> {
    return this.apiService.patch<Cliente, Cliente>(`${this.URL}/${id}`, cliente, {})
  }

  delete(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.URL}/${id}`, {})
  }

  check(dni: string, email: string, usuario: string): Observable<{ dni: string; email: string; usuario: string }> {
    return this.apiService.post<{ dni: string; email: string; usuario: string }, { dni: string; email: string; usuario: string }>(
      `${this.URL}/check`, 
      { dni, email, usuario }, 
      {}
    )
  }


}
